export type EntityLabelOption = {
  value: string | number;
  label: string;
}

export type EntityNameOption = {
  _id: string | number;
  name: string;
}

export type CombinedOptions = EntityNameOption | EntityLabelOption;

type ReturnedOption = {
  value: string | number;
  label: string;
}

const selectNormalizer = (options: CombinedOptions[]): ReturnedOption[] | null => {
  if (Array.isArray(options)) {
    return options.map((d) => ({
      value: (d as EntityNameOption)._id || (d as EntityLabelOption).value,
      label: (d as EntityNameOption).name || (d as EntityLabelOption).label,
    }));
  }
  return null;
};

export default selectNormalizer;
