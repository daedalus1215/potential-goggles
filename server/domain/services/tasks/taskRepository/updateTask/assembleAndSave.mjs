import EntityToDto from "../FetchTaskByIdRepository/EntityToDto.mjs";
import sumExistingTime from "./sumExistingTime.mjs";

const assembleAndSave = (dto) => async (err, doc) => {
    if (err) throw err;

    const existingTime = sumExistingTime(doc);

    const timeOffset = parseInt(dto.time) - existingTime;

    if (timeOffset > 0) {
        doc.time = [
            ...doc.time,
            {
                date: dto.date,
                time: timeOffset,
                
            }
        ];
    }

    // @TODO: SPIKE
    //@TODO: END SPIKE
    doc.description = dto.description;
    doc.date = new Date();
    doc.contractId = dto.contractId;
    doc.tags = dto.tags;
    
    //@TODO: 3/27/24 - I just added this. I am moving over to adding title in the test and front end.
    doc.title = dto.title
    const savedTask = await doc.save();
    return EntityToDto(savedTask);
};


export default assembleAndSave;