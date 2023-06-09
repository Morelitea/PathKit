import { useParams, useNavigate } from "react-router-dom";
import { useEntities, useNotes } from "../../hooks";
import styles from "./Sheets.module.scss";
import { useCallback, useState, useEffect } from "react";

import { Button } from "../buttons";
import classNames from "classnames";
import { defaultEntity, sizeOptions } from "../../consts";
import {
  getAbilityModifier,
  getPlayerMaxHp,
  getProficiencyModifier,
} from "../../utilities";
import { EntityType, Proficiency, INote, TraitType } from "../../api/model";
import DataCellDisplay from "../displays/DataCellDisplay";
import { StatsDisplay } from "../displays/StatsDisplay";
import NotesObject from "../objects/NoteObject";
import CollapsibleHeader from "../headers/CollapsibleHeader";
import ActionsFilter from "./EntitySheet.ActionsFilter";
import { SheetHeader } from "./SheetHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EntitySheet() {
  const { entityId } = useParams();
  const navigate = useNavigate();
  const { getEntityById, updateEntityById, entities } = useEntities();
  const { updateOrAddNote } = useNotes();
  const [entity, setEntity] = useState(defaultEntity);
  const [imageExpanded, setImageExpanded] = useState(false);
  const [maxHp, setMaxHp] = useState<number>(entity.maxHp || 0);

  useEffect(() => {
    const matchEntity = getEntityById(entityId);
    if (matchEntity) {
      setEntity(matchEntity);
    }
  }, [entityId, entities]);

  useEffect(() => {
    if (entity.type === EntityType.Player) {
      const playerMaxHp = getPlayerMaxHp(entity);
      setMaxHp(playerMaxHp);
    }
  }, [entity]);

  const handleCancelClick = () => {
    navigate("/");
  };

  const handleEditClick = useCallback(() => {
    navigate(`/entity/${entityId}/edit`);
  }, [entity]);

  const handleUpdatingNote = async (note: INote) => {
    if (entity.id && note.id) {
      const updatedEntity = await updateEntityById({
        id: entity.id,
        noteId: note.id,
      });
      if (updatedEntity) {
        setEntity(updatedEntity);
      }
    }
  };

  const handleImageExpand = () => {
    setImageExpanded((prev) => !prev);
  };

  const size = sizeOptions.find((o) => o.value === entity.build.size);

  return (
    <div className={styles.sheetsContainer}>
      <SheetHeader
        title={entity?.name}
        subtitle={
          <>{entity.build.level ? `level: ${entity.build.level}` : ""}</>
        }
        onEditClick={handleEditClick}
        onCloseClick={handleCancelClick}
      />
      <div className={styles.sheetContent}>
        {entity?.image && (
          <div
            className={classNames(
              styles.imageContainer,
              imageExpanded && styles.imageExpanded
            )}
          >
            <img src={entity.image} alt={entity.name} />
            <Button
              icon={imageExpanded ? "compress" : "expand"}
              onClick={handleImageExpand}
              variant="text"
              className={styles.fullSizeButton}
              title={imageExpanded ? "Compress image" : "Expand image"}
            />
          </div>
        )}
        <div
          className={styles.sheetRowContainerLeftAlign}
          style={{ marginTop: "1em" }}
        >
          {size && (
            <div>
              <DataCellDisplay
                name={size.label} // Use the label as the name
                value={size.label} // Displaying the name
                align="center"
                labelPosition="above"
                tag={TraitType.Size}
              />
            </div>
          )}
          {entity?.build?.traits &&
            entity.build.traits.map((trait, index) => (
              <div key={index}>
                <DataCellDisplay
                  name={`Trait ${index + 1}`}
                  value={trait[0]} // Displaying the name
                  align="center"
                  labelPosition="above"
                  tag={trait[1]} // Passing the tag value
                />
              </div>
            ))}
        </div>
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.proficiencies?.perception && (
            <DataCellDisplay
              name="build.proficiencies.perception"
              value={getProficiencyModifier(
                entity,
                Proficiency.perception,
                true
              )}
              label={`Perception`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.keyability && (
            <DataCellDisplay
              name="build.keyability"
              value={entity.build.keyability.toUpperCase()}
              label={`Key Ability`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.quantity === 1 && (
            <div className={styles.entityHp}>
              <DataCellDisplay
                name="damage"
                value={maxHp - (entity?.damage[0] || 0)}
                label={`Hit Points`}
                labelPosition="inline"
                align="start"
                small
              />
              /
              <DataCellDisplay
                name="maxHp"
                value={maxHp}
                labelPosition="inline"
                align="start"
                small
              />
            </div>
          )}
        </div>
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.languages && (
            <DataCellDisplay
              name="entity.build.languages"
              value={entity?.build?.languages.join(", ")}
              label={`Languages`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.conditions && entity.conditions.length > 0 ? (
            <DataCellDisplay
              name="conditions"
              value={entity?.conditions.map((c) => c.name).join(", ")}
              label="Conditions Applied"
              labelPosition="inline"
              align="start"
            />
          ) : (
            <DataCellDisplay
              name="conditions"
              value="N/A"
              label="Conditions Applied"
              labelPosition="inline"
              align="start"
            />
          )}
        </div>
        {entity?.build?.desc && (
          <CollapsibleHeader
            title="Description"
            toggle
            as="h4"
            nested
            defaultCollapsed
          >
            <p>{entity.build.desc}</p>
          </CollapsibleHeader>
        )}
        <hr />
        <div className={styles.sheetRowContainerLeftAlign}>
          <DataCellDisplay
            name="build.abilities.str"
            value={entity.build.abilities.str}
            label={`STR [${getAbilityModifier(
              entity.build.abilities.str,
              true
            )}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.dex"
            value={entity.build.abilities.dex}
            label={`DEX [${getAbilityModifier(
              entity.build.abilities.dex,
              true
            )}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.con"
            value={entity.build.abilities.con}
            label={`CON [${getAbilityModifier(
              entity.build.abilities.con,
              true
            )}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.int"
            value={entity.build.abilities.int}
            label={`INT [${getAbilityModifier(
              entity.build.abilities.int,
              true
            )}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.wis"
            value={entity.build.abilities.wis}
            label={`WIS [${getAbilityModifier(
              entity.build.abilities.wis,
              true
            )}]`}
            labelPosition="above"
            align="center"
            small
          />
          <DataCellDisplay
            name="build.abilities.cha"
            value={entity.build.abilities.cha}
            label={`CHA [${getAbilityModifier(
              entity.build.abilities.cha,
              true
            )}]`}
            labelPosition="above"
            align="center"
            small
          />
        </div>
        <hr />
        <StatsDisplay entity={entity} labelPosition={"above"} />
        <hr />
        {entity?.quantity > 1 && entity?.maxHp && (
          <div className={styles.sheetRowContainerLeftAlign}>
            {entity.damage.map((damage, index) => (
              <div key={index} className={styles.entityHp}>
                {entity.maxHp && (
                  <>
                    <DataCellDisplay
                      name="damage"
                      value={entity.maxHp - damage}
                      labelPosition="inline"
                      align="start"
                      small
                    />
                    /
                  </>
                )}
                <DataCellDisplay
                  name="maxHp"
                  value={entity?.maxHp ?? ""}
                  labelPosition="inline"
                  align="start"
                  small
                />
              </div>
            ))}
          </div>
        )}
        {entity?.build?.equipment && (
          <CollapsibleHeader
            title="Equipment"
            toggle
            as="h4"
            nested
            defaultCollapsed
          >
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Bulk</th>
                  <th>Value</th>
                  <th>Worn</th>
                </tr>
              </thead>
              <tbody>
                {entity.build.equipment.map((item, index) => (
                  <tr key={index}>
                    <td>{item[0]}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                    <td>{item[3]}</td>
                    <td>
                      {item[4] && <FontAwesomeIcon icon="circle-check" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CollapsibleHeader>
        )}
        {entity?.build?.feats && (
          <CollapsibleHeader
            title="Features"
            toggle
            as="h4"
            nested
            defaultCollapsed
          >
            <table className={styles.sheetTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Secondary</th>
                  <th>Feat Type</th>
                  <th>Level</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {entity.build.feats.map((feat, index) => {
                  const [name, secondary, featType, level, desc] = feat;

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{secondary}</td>
                      <td>{featType}</td>
                      <td>{level}</td>
                      <td>{desc}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CollapsibleHeader>
        )}
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.attributes?.speed && (
            <DataCellDisplay
              name="entity.build.attributes.speed"
              value={entity.build.attributes.speed}
              label={`Speed`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.fly && (
            <DataCellDisplay
              name="entity.build.attributes.fly"
              value={entity.build.attributes.fly}
              label={`Fly`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.burrow && (
            <DataCellDisplay
              name="entity.build.attributes.burrow"
              value={entity.build.attributes.burrow}
              label={`Burrow`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.climb && (
            <DataCellDisplay
              name="entity.build.attributes.climb"
              value={entity.build.attributes.climb}
              label={`Climb`}
              labelPosition="inline"
              align="start"
            />
          )}
          {entity?.build?.attributes?.swim && (
            <DataCellDisplay
              name="entity.build.attributes.swim"
              value={entity.build.attributes.swim}
              label={`Swim`}
              labelPosition="inline"
              align="start"
            />
          )}
        </div>
        <div className={styles.sheetRowContainerLeftAlign}>
          {entity?.build?.resistances &&
            entity.build.resistances.length > 0 && (
              <DataCellDisplay
                name="entity.build.resistances"
                value={entity.build.resistances.join(", ")}
                label="Resistances"
                labelPosition="inline"
                align="start"
              />
            )}

          {entity?.build?.immunities && entity.build.immunities.length > 0 && (
            <DataCellDisplay
              name="entity.build.immunities"
              value={entity.build.immunities.join(", ")}
              label="Immunities"
              labelPosition="inline"
              align="start"
            />
          )}
        </div>
        <ActionsFilter entity={entity} />
        {entity.id && (
          <NotesObject
            defaultTitle={`Notes for ${entity.name} (${entity.id.slice(-5)})`}
            noteId={entity.noteId || undefined}
            onChange={(note) => {
              updateOrAddNote(
                { ...note, entityId: entity.id },
                handleUpdatingNote
              );
            }}
          />
        )}
      </div>
      {/* <pre>{JSON.stringify(entity, null, 2)}</pre> */}
    </div>
  );
}

export default EntitySheet;
