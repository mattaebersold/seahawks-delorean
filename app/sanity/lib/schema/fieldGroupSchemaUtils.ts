import type { FieldDefinition } from "sanity";

// Set all the fields to the "content" group
export function contentGroup(fields: FieldDefinition[]): FieldDefinition[] {
  return setGroup("content", fields);
}

// Set a common "group" value to all fields
export function setGroup(
  groupName: string,
  fields: FieldDefinition[]
): FieldDefinition[] {
  return fields.map((field) => {
    let groupValue: string[] | string;
    if ("group" in field) {
      if (Array.isArray(field.group))
        groupValue = [...field.group, groupName];
      else groupValue = [field.group as string, groupName];
    } else {
      groupValue = groupName;
    }
    return { group: groupValue, ...field };
  });
}
