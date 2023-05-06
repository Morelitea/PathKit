import { useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useStore } from "./useStore";
import { IPlan } from "../api/model";
import { usePreferencesStore } from "./usePreferencesStore";
import { PartialBy } from "../utilities";

export type PartialPlan = PartialBy<IPlan, "planId" | "campaignId">;

interface IUsePlans {
  plans: IPlan[];
  setPlans: (plans: IPlan[]) => void;
  addPlan: (plan: PartialPlan) => IPlan;
  getPlanById: (planId?: string | number) => IPlan | undefined;
  deletePlan: (planId: string | number) => void;
  updatePlan: (plan: PartialPlan) => IPlan;
  updateOrAddPlan: (plan: PartialPlan) => IPlan;
}
export const usePlans = (): IUsePlans => {
  const { plans, setPlans, refreshPlans, currentCampaignId } = useStore(
    (store) => ({
      plans: store.plans,
      setPlans: store.setPlans,
      refreshPlans: store.refreshPlans,
      currentCampaignId: store.currentCampaignId,
    })
  );

  // Initial call should refresh stored plans from API
  useEffect(() => {
    refreshPlans();
  }, []);

  const addPlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      const plan: IPlan = {
        ...newPlan,
        planId: uuid(),
        campaignId: currentCampaignId, // TODO get campaignId from high level
      } as IPlan;

      setPlans([...plans, plan]);
      return plan;
    },
    [plans, currentCampaignId]
  );

  const getPlanById = useCallback(
    (planId?: string | number): IPlan | undefined => {
      const matches = plans.filter((p) => p.planId === planId);
      if (matches.length) {
        return matches[0];
      }
    },
    [plans]
  );

  const deletePlan = useCallback(
    async (planId: string | number): Promise<void> => {
      return await setPlans(plans.filter((p) => p.planId !== planId));
    },
    [plans]
  );

  const updatePlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      let plan = newPlan;
      const newPlans: IPlan[] = plans.map((p) => {
        if (p.planId === newPlan.planId) {
          plan = Object.assign({}, p, plan);
          return plan as IPlan;
        }
        return p;
      });
      setPlans(newPlans);
      return plan as IPlan;
    },
    [plans]
  );

  const updateOrAddPlan = useCallback(
    (newPlan: PartialPlan): IPlan => {
      const planExists = getPlanById(newPlan.planId);
      if (planExists) {
        return updatePlan(newPlan);
      }
      return addPlan(newPlan);
    },
    [plans]
  );

  return {
    plans: plans.filter((n) => n.campaignId === currentCampaignId),
    setPlans,
    addPlan,
    getPlanById,
    deletePlan,
    updatePlan,
    updateOrAddPlan,
  };
};