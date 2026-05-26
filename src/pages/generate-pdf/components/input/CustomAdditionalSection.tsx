import type React from "react";
import { useDebouncedCallback } from "use-debounce";
import { useTranslation } from "react-i18next";

import {
  ExpandableSectionContainer,
  ExpandableSectionItem,
} from "./ExpandableSectionContainer";
import DateInput from "./DateInput";
import InputField from "./InputField";
import TextArea from "./TextArea";
import {
  DEFAULT_CUSTOM_SECTION,
  DEFAULT_CUSTOM_SECTION_ITEM,
} from "../../const/generatePdfConst";
import type { ICustomSection, ICustomSectionItem } from "../../interface/generatePdfInterface";

const CustomAdditionalSection = ({
  sections,
  setSections,
  summaryMode = false,
}: {
  sections: ICustomSection[];
  setSections: React.Dispatch<React.SetStateAction<ICustomSection[]>>;
  summaryMode?: boolean;
}) => {
  const { t } = useTranslation("creationPage");

  const handleEditGroupTitle = (groupId: number, value: string) => {
    setSections(
      sections.map((g) => (g.id === groupId ? { ...g, sectionTitle: value } : g)),
    );
  };

  const handleAddGroup = () => {
    const latestId = sections.length > 0 ? sections.at(-1)?.id ?? 0 : 0;
    setSections([...sections, { ...DEFAULT_CUSTOM_SECTION, id: latestId + 1 }]);
  };

  const handleDeleteGroup = (groupId: number) => {
    setSections(sections.filter((g) => g.id !== groupId));
  };

  const handleAddItem = (groupId: number) => {
    setSections(
      sections.map((g) => {
        if (g.id !== groupId) return g;
        const latestItemId = g.items.length > 0 ? g.items.at(-1)?.id ?? 0 : 0;
        return { ...g, items: [...g.items, { ...DEFAULT_CUSTOM_SECTION_ITEM, id: latestItemId + 1 }] };
      }),
    );
  };

  const handleDeleteItem = (groupId: number, itemId: number) => {
    setSections(
      sections.map((g) => (g.id === groupId ? { ...g, items: g.items.filter((it) => it.id !== itemId) } : g)),
    );
  };

  const handleEditItem = (groupId: number, itemId: number, key: string, value: string) => {
    setSections(
      sections.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          items: g.items.map((it) => (it.id === itemId ? { ...it, [key]: value } : it)),
        };
      }),
    );
  };

  const handleItemUp = (groupIndex: number, itemIndex: number) => {
    const currentSections = [...sections];
    const items = [...currentSections[groupIndex].items];
    const tmp = items[itemIndex];
    items[itemIndex] = items[itemIndex - 1];
    items[itemIndex - 1] = tmp;
    currentSections[groupIndex] = { ...currentSections[groupIndex], items };
    setSections(currentSections);
  };

  const handleItemDown = (groupIndex: number, itemIndex: number) => {
    const currentSections = [...sections];
    const items = [...currentSections[groupIndex].items];
    const tmp = items[itemIndex];
    items[itemIndex] = items[itemIndex + 1];
    items[itemIndex + 1] = tmp;
    currentSections[groupIndex] = { ...currentSections[groupIndex], items };
    setSections(currentSections);
  };

  return (
    <ExpandableSectionContainer
      title={t("additionalSections.labels.custom", "Custom Section")}
      addButtonTitle={t("additionalSections.customAddButton", "Add another custom section")}
      description={t(
        "additionalSections.customDescription",
        "Create your own additional section with custom title and details.",
      )}
      onAdd={handleAddGroup}
      summaryMode={summaryMode}
    >
      {sections.map((group, groupIndex) => (
        <div key={group.id} className="mb-4 border border-slate-100 bg-white p-3 rounded-md">
          <div className="flex items-center justify-between mb-3">
            <InputField
              defaultValue={group.sectionTitle}
              onChange={(v: string) => handleEditGroupTitle(group.id, v)}
              label={t("additionalSections.customSectionTitle", "Section Title")}
              inputClass="w-3/4"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => handleAddItem(group.id)} className="text-sm text-blue-600">{t("additionalSections.addItem", "Add item")}</button>
              <button type="button" onClick={() => handleDeleteGroup(group.id)} className="text-sm text-red-600">{t("additionalSections.deleteSection", "Delete section")}</button>
            </div>
          </div>

          {group.items.map((item, itemIndex) => (
            <ExpandableSectionItem
              key={item.id}
              title={item.name || t("additionalSections.customDefault", "(Not Specified)")}
              description={item.startAt && `${item.startAt} - ${item.endsAt ? item.endsAt : t("general.now", "Now")}`}
              onDelete={() => handleDeleteItem(group.id, item.id)}
              onMoveUp={() => handleItemUp(groupIndex, itemIndex)}
              onMoveDown={() => handleItemDown(groupIndex, itemIndex)}
              index={itemIndex}
              isFirst={itemIndex === 0}
              isLast={itemIndex === group.items.length - 1}
              defaultExpanded={itemIndex === 0}
            >
              <GroupItemEditor
                groupId={group.id}
                item={item}
                handleEditItem={handleEditItem}
              />
            </ExpandableSectionItem>
          ))}
        </div>
      ))}
    </ExpandableSectionContainer>
  );
};

const GroupItemEditor = ({
  groupId,
  item,
  handleEditItem,
}: {
  groupId: number;
  item: ICustomSectionItem;
  handleEditItem: (groupId: number, itemId: number, key: string, value: string) => void;
}) => {
  const { t } = useTranslation("creationPage");

  const handleTextChange = useDebouncedCallback((groupId: number, itemId: number, key: string, value: string) => {
    handleEditItem(groupId, itemId, key, value);
  }, 500);

  const fieldInputClass = "w-full rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <InputField
          defaultValue={item.name}
          onChange={(input: string) => handleTextChange(groupId, item.id, "name", input)}
          label={t("additionalSections.customName", "Name")}
          inputClass={fieldInputClass}
        />

        <DateInput
          startDefaultValue={item.startAt}
          endDefaultValue={item.endsAt}
          startOnChange={(value: string) => handleTextChange(groupId, item.id, "startAt", value)}
          endOnChange={(value: string) => handleTextChange(groupId, item.id, "endsAt", value)}
          label={t("additionalSections.customDate", "Start & End Date")}
          placeholder={t("additionalSections.customDatePlaceholder", "MM // YYYY")}          
          inputClass={fieldInputClass}
        />

        <InputField
          defaultValue={item.city}
          onChange={(input: string) => handleTextChange(groupId, item.id, "city", input)}
          label={t("additionalSections.customCity", "City")}
          inputClass={fieldInputClass}
        />
      </div>

      <div className="mt-4">
        <TextArea
          defaultValue={item.description}
          onChange={(input: string) => handleTextChange(groupId, item.id, "description", input)}
          label={t("additionalSections.customDescriptionLabel", "Description")}
          inputClass={fieldInputClass}
        />
      </div>
    </div>
  );
};

export default CustomAdditionalSection;
