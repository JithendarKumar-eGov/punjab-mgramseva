import React, { useState, useRef } from "react";
import { FormComposerV2, TextInput, Button, Card, CardLabel, CardSubHeader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { Toast } from "@egovernments/digit-ui-react-components";
import { addBoundaryHierarchyConfig } from "../configs/addBoundaryHierarchyConfig ";
import { useHistory } from "react-router-dom";

const BoundaryHierarchyTypeAdd = () => {
  const { t } = useTranslation();
  const stateId = Digit.ULBService.getStateId();
  const [showToast, setShowToast] = useState(null);
  const [config, setConfig] = useState([...addBoundaryHierarchyConfig]);
  const levelCounter = useRef(2);
  const history = useHistory();

  const reqCriteriaBoundaryHierarchyTypeAdd = {
    url: "/boundary-service/boundary-hierarchy-definition/_create",
    params: {},
    body: {},
    config: {
      enabled: true,
    },
  };

  const hierarchy_mutation = Digit.Hooks.useCustomAPIMutationHook(reqCriteriaBoundaryHierarchyTypeAdd);

  const generateDynamicParentType = (data) => {
    const dynamicParentType = {};
    const levelKeys = data.levelcards;

    for (let i = 1; i < levelKeys.length; i++) {
      const currentLevel = levelKeys[i].level;
      const previousLevel = levelKeys[i - 1].level;
      dynamicParentType[currentLevel] = previousLevel;
    }

    return dynamicParentType;
  };

  const closeToast = () => {
    setTimeout(() => {
      setShowToast(null);
    }, 5000);
  };

  const handleFormSubmit = async (formData, setValue) => {
    try {
      const allLevelsValid = formData.levelcards.every((levelCard) => {
        return levelCard.level.trim() !== "";
      });

      if (!allLevelsValid) {
        setShowToast({ label: `${t("MGRAMSEVA_LEVEL_IS_MANDATORY")}`, isWarning: true });
        closeToast();
        return;
      }
      const parentTypeMapping = generateDynamicParentType(formData);

      const boundaryHierarchy = formData.levelcards
        .map((level, index) => {
          const currentLevel = level.level;
          const parentBoundaryType = index === 0 ? null : parentTypeMapping[currentLevel] || null;

          if (currentLevel.trim() !== "") {
            return {
              boundaryType: currentLevel,
              parentBoundaryType: parentBoundaryType,
              active: true,
            };
          }
        })
        .filter(Boolean);

      await hierarchy_mutation.mutate(
        {
          params: {},
          body: {
            BoundaryHierarchy: {
              tenantId: stateId,
              hierarchyType: formData.hierarchyType,
              boundaryHierarchy: boundaryHierarchy,
            },
          },
        },
        {
          onError: (resp) => {
            let label = `${t("WBH_BOUNDARY_CREATION_FAIL")}: `;
            resp?.response?.data?.Errors?.map((err, idx) => {
              if (idx === resp?.response?.data?.Errors?.length - 1) {
                label = label + t(Digit.Utils.locale.getTransformedLocale(err?.code)) + ".";
              } else {
                label = label + t(Digit.Utils.locale.getTransformedLocale(err?.code)) + ", ";
              }
            });
            setShowToast({ label, isWarning: true });
            closeToast();
          },
          onSuccess: () => {
            setShowToast({ label: `${t("WBH_BOUNDARY_UPSERT_SUCCESS")}` });
            closeToast();
            setConfig([...addBoundaryHierarchyConfig]);
            // setValue("hierarchyType", "");
            // setValue("levelcards", null);
            setTimeout(() => {
              history.push(`/${window?.contextPath}/employee`);
            }, 2000);
          },
        }
      );
    } catch {}
  };

  return (
    <React.Fragment>
      <FormComposerV2
        defaultValues={{}}
        onSubmit={handleFormSubmit}
        fieldStyle={{ marginRight: 0 }}
        config={config}
        noBreakLine={true}
        label={t("MGRAMSEVA_CREATE_BOUNDARY_HIERARCHY")}
        heading={t("MGRAMSEVA_CREATE_BOUNDARY_HIERARCHY")}
        description={t("MGRAMSEVA_CREATE_BOUNDARY_HIERARCHY_DESCRIPTION")}
        enableDelete={true}
        headingStyle={{ marginBottom: "1rem" }}
        descriptionStyle={{ color: "#0B0C0C" }}
      ></FormComposerV2>
      {showToast && (
        <Toast
          warning={showToast.isWarning}
          label={showToast.label}
          isDleteBtn={"true"}
          onClose={() => setShowToast(false)}
          style={{ bottom: "8%" }}
        />
      )}{" "}
    </React.Fragment>
  );
};

export default BoundaryHierarchyTypeAdd;
