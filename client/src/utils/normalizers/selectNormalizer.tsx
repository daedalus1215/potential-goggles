interface EntityOption {
  _id: string;
  name: string;
  value: string | number;
  label: string;
}

interface ReturnedOption {
  value: string | number;
  label: string;
}

const selectNormalizer = (options: EntityOption[]): ReturnedOption[] | null => {
  return options instanceof Array
    ? options?.map(d => ({
        value: d?._id || d.value,
        label: d?.name || d.label,
      }))
    : null;
};

export default selectNormalizer;
