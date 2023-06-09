import { FieldArray } from "formik";
import { EntityType, Proficiency } from "../../../api/model";
import styles from "../Form.module.scss";
import FormField from "../../formFields/FormField";
import FileUploader from "../../formFields/FileUploader";
import FormButton from "../../formFields/FormButton";
import { IEntityFormChildrenProps } from "../AddEntityForm";
import {
  abilityOptions,
  defaultTrait,
  profLevelOptions,
  sizeOptions,
  traitOptions,
} from "../../../consts";
import { getAbilityModifier, getProficiencyModifier } from "../../../utilities";
import CollapsibleHeader from "../../headers/CollapsibleHeader";
import { EntitySkillsForm } from "./PlayerSkillsForm";
import classNames from "classnames";

const EntityGeneralForm: React.FC<IEntityFormChildrenProps> = ({
  formProps,
}) => {
  const { values, setFieldValue } = formProps;
  const handleFileChange = (value: any) => {
    setFieldValue("image", value);
  };
  return (
    <>
      <CollapsibleHeader title="General attributes" as="h4" nested>
        <div className={styles.formRow}>
          <FormField
            name="image"
            label="Image"
            placeholder="Image URL or Base64"
          />
          <FileUploader
            name="image"
            toBase64
            defaultValue={values.image}
            onUpload={handleFileChange}
          />
        </div>
        <div className={styles.formRow}></div>
        <FormField name="name" label="Name" />
        {[EntityType.Player, EntityType.Monster, EntityType.NPC].includes(
          values.type
        ) && (
          <div className={styles.formRow}>
            <FormField name="build.level" type="number" label="Level" />
            <FormField name="build.size" as="select" label="Size">
              {sizeOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </FormField>
          </div>
        )}
        <div className={styles.formRow}>
          <FormField
            label="Description"
            name={`build.desc`}
            as="textarea"
            style={{ resize: "vertical" }}
          />
        </div>

        {[EntityType.Player, EntityType.Monster, EntityType.NPC].includes(
          values.type
        ) && (
          <>
            <div className={styles.formRow}>
              <FormField
                label={`Perception [${getProficiencyModifier(
                  values,
                  Proficiency.perception,
                  true
                )}]`}
                name="build.proficiencies.perception"
                as="select"
              >
                {profLevelOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </FormField>
              <FormField
                label="Key Ability"
                name="build.keyability"
                as="select"
              >
                {abilityOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </FormField>
            </div>
            <div className={styles.formRow}>
              <FormField
                name="build.abilities.str"
                type="number"
                label={`STR [${getAbilityModifier(
                  values.build.abilities.str,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                small
              />
              <FormField
                name="build.abilities.dex"
                type="number"
                label={`DEX [${getAbilityModifier(
                  values.build.abilities.dex,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                small
              />
              <FormField
                name="build.abilities.con"
                type="number"
                label={`CON [${getAbilityModifier(
                  values.build.abilities.con,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                small
              />
              <FormField
                name="build.abilities.int"
                type="number"
                label={`INT [${getAbilityModifier(
                  values.build.abilities.int,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                small
              />
              <FormField
                name="build.abilities.wis"
                type="number"
                label={`WIS [${getAbilityModifier(
                  values.build.abilities.wis,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                small
              />
              <FormField
                name="build.abilities.cha"
                type="number"
                label={`CHA [${getAbilityModifier(
                  values.build.abilities.cha,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                small
              />
            </div>
          </>
        )}
        {[
          EntityType.Player,
          EntityType.Monster,
          EntityType.NPC,
          EntityType.Hazard,
        ].includes(values.type) && (
          <>
            <div className={styles.formRow}>
              <FormField
                label="AC"
                labelPosition="above"
                align="center"
                name="build.acTotal.acTotal"
                type="number"
              />
              <FormField
                label={`DC [${getProficiencyModifier(
                  values,
                  Proficiency.classDC,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                name="build.proficiencies.classDC"
                as="select"
                type="number"
              >
                {profLevelOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </FormField>
            </div>
            <div className={styles.formRow}>
              <FormField
                label={`Will [${getProficiencyModifier(
                  values,
                  Proficiency.will,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                name="build.proficiencies.will"
                as="select"
                type="number"
              >
                {profLevelOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </FormField>
              <FormField
                label={`Reflex [${getProficiencyModifier(
                  values,
                  Proficiency.reflex,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                name="build.proficiencies.reflex"
                as="select"
                type="number"
              >
                {profLevelOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </FormField>
              <FormField
                label={`Fortitude [${getProficiencyModifier(
                  values,
                  Proficiency.fortitude,
                  true
                )}]`}
                labelPosition="above"
                align="center"
                name="build.proficiencies.fortitude"
                as="select"
                type="number"
              >
                {profLevelOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </FormField>
            </div>
            <div className={styles.formRow}>
              {/*multiple hp's may exist in one entity is it is a group. This will be
      based on monster quantity.*/}
              <FormField
                label="Max HP"
                name="maxHp"
                type="number"
                labelPosition="above"
                disabled={values.type === EntityType.Player}
                title={
                  values.type === EntityType.Player
                    ? "Calculated for players"
                    : ""
                }
              />
              <FormField
                label={
                  <span>
                    Bonus HP{" "}
                    <span style={{ fontSize: "0.67em" }}>per level</span>
                  </span>
                }
                name="build.attributes.bonushpPerLevel"
                type="number"
                labelPosition="above"
              />
              <FormField
                label="Bonus HP"
                name="build.attributes.bonushp"
                type="number"
                labelPosition="above"
              />
            </div>
          </>
        )}
        {[EntityType.Player, EntityType.Monster, EntityType.NPC].includes(
          values.type
        ) && (
          <>
            <div className={styles.formRow}>
              <FormField
                label="Speed"
                name="build.attributes.speed"
                type="number"
                small
                labelPosition="above"
                align="center"
              />
              <FormField
                label="Fly"
                name="build.attributes.fly"
                type="number"
                small
                labelPosition="above"
                align="center"
              />
              <FormField
                label="Burrow"
                name="build.attributes.burrow"
                type="number"
                small
                labelPosition="above"
                align="center"
              />
              <FormField
                label="Climb"
                name="build.attributes.climb"
                type="number"
                small
                labelPosition="above"
                align="center"
              />
              <FormField
                label="Swim"
                name="build.attributes.swim"
                type="number"
                small
                labelPosition="above"
                align="center"
              />
            </div>
          </>
        )}
      </CollapsibleHeader>

      {[
        EntityType.Player,
        EntityType.Monster,
        EntityType.NPC,
        EntityType.Hazard,
      ].includes(values.type) && (
        <>
          <CollapsibleHeader
            toggle
            title="Traits"
            as="h4"
            nested
            defaultCollapsed
          >
            <FieldArray name="build.traits">
              {({ remove, push }) => (
                <div className={styles.formRow}>
                  {values.build.traits.map((_, i) => (
                    <div className={styles.formRow}>
                      <FormField name={`build.traits.${i}[0]`} />
                      <FormField
                        label="Tag"
                        name={`build.traits.${i}[1]`}
                        as="select"
                      >
                        {traitOptions.map((o) => (
                          <option key={o.tag} value={o.tag}>
                            {o.tag}
                          </option>
                        ))}
                      </FormField>
                      <FormButton
                        variant="text"
                        icon="circle-minus"
                        onClick={() => remove(i)}
                        title="Remove trait"
                      />
                    </div>
                  ))}
                  <div className={styles.formRow}>
                    <FormButton
                      variant="subtle"
                      icon="circle-plus"
                      onClick={() => push(defaultTrait)}
                    >
                      Add trait
                    </FormButton>
                  </div>
                </div>
              )}
            </FieldArray>
          </CollapsibleHeader>
        </>
      )}
      {[EntityType.Player, EntityType.Monster, EntityType.NPC].includes(
        values.type
      ) && (
        <>
          <CollapsibleHeader
            toggle
            title="Languages"
            as="h4"
            nested
            defaultCollapsed
          >
            <FieldArray name="build.languages">
              {({ remove, push }) => (
                <div className={styles.formRow}>
                  {values.build.languages.map((_, i) => (
                    <div className={styles.formRow}>
                      <FormField name={`build.languages.${i}`} />
                      <FormButton
                        variant="text"
                        icon="circle-minus"
                        onClick={() => remove(i)}
                        title="Remove language"
                      />
                    </div>
                  ))}
                  <div className={styles.formRow}>
                    <FormButton
                      variant="subtle"
                      icon="circle-plus"
                      onClick={() => push("")}
                    >
                      Add language
                    </FormButton>
                  </div>
                </div>
              )}
            </FieldArray>
          </CollapsibleHeader>
        </>
      )}
      {[EntityType.Player, EntityType.Monster, EntityType.Hazard].includes(
        values.type
      ) && (
        <CollapsibleHeader
          toggle
          title="Resistances & Immunities"
          as="h4"
          nested
          defaultCollapsed
        >
          <FieldArray name="build.resistances">
            {({ remove, push }) => (
              <div className={classNames(styles.formRow, styles.formSection)}>
                {values.build.resistances.map((_, i) => (
                  <div className={styles.formRow}>
                    <FormField name={`build.resistances.${i}`} />
                    <FormButton
                      variant="text"
                      icon="circle-minus"
                      onClick={() => remove(i)}
                      title="Remove resistance"
                    />
                  </div>
                ))}
                <div className={styles.formRow}>
                  <FormButton
                    variant="subtle"
                    icon="circle-plus"
                    onClick={() => push("")}
                  >
                    Add resistance
                  </FormButton>
                </div>
              </div>
            )}
          </FieldArray>
          <FieldArray name="build.immunities">
            {({ remove, push }) => (
              <div className={classNames(styles.formRow, styles.formSection)}>
                {values.build.immunities.map((_, i) => (
                  <div className={styles.formRow}>
                    <FormField name={`build.immunities.${i}`} />
                    <FormButton
                      variant="text"
                      icon="circle-minus"
                      onClick={() => remove(i)}
                      title="Remove immunity"
                    />
                  </div>
                ))}
                <div className={styles.formRow}>
                  <FormButton
                    variant="subtle"
                    icon="circle-plus"
                    onClick={() => push("")}
                  >
                    Add immunity
                  </FormButton>
                </div>
              </div>
            )}
          </FieldArray>
        </CollapsibleHeader>
      )}
      {[
        EntityType.Player,
        EntityType.Monster,
        EntityType.NPC,
        EntityType.Hazard,
      ].includes(values.type) && (
        <>
          <EntitySkillsForm formProps={formProps} />
          <CollapsibleHeader
            toggle
            title="Conditions"
            as="h4"
            nested
            defaultCollapsed
          >
            <FieldArray name="conditions">
              {({ remove, push }) => (
                <div className={styles.formRow}>
                  {values.conditions.map((_, i) => {
                    return (
                      <div className={styles.formRow}>
                        <FormField name={`conditions.${i}.name`} />
                        <FormField
                          label="Has value?"
                          name={`conditions.${i}.isValued`}
                          type="checkbox"
                          small
                        />
                        <FormField
                          label="Value"
                          name={`conditions.${i}.value`}
                          type="number"
                          small
                        />
                        <FormButton
                          variant="text"
                          icon="circle-minus"
                          onClick={() => remove(i)}
                          title="Remove condition"
                        />
                      </div>
                    );
                  })}
                  <div className={styles.formRow}>
                    <FormButton
                      variant="subtle"
                      icon="circle-plus"
                      onClick={() => push("")}
                    >
                      Add condition
                    </FormButton>
                  </div>
                </div>
              )}
            </FieldArray>
          </CollapsibleHeader>
        </>
      )}
    </>
  );
};

export default EntityGeneralForm;
