
interface SubmitProp {
  id: string;
  date: string;
  minutes: string;
}

const useSubmit = (taskId: String, setIsShowingEditDateTimeForm: (isShowing: boolean) => void): ((editDateTime: EditDateTimeInterface) => void) => {
  // const dispatch = useDispatch();
  return ({ id, date, minutes }: SubmitProp) => {
    const config = {
      body: {
        id,
        date,
        minutes,
      },
      taskId,
      dateTimeId: id,
    };

    //@TODO: Invoke an action and persist the Date Time
    // dispatch(putDateTime(config));
    setIsShowingEditDateTimeForm(false);
    // window.location.reload();
  };
};

export default useSubmit;
