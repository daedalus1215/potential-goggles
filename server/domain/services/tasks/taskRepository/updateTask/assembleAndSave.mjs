import EntityToDto from "../FetchTaskByIdRepository/EntityToDto.mjs";
import sumExistingTime from "./sumExistingTime.mjs";
import striptags from 'striptags';

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
    doc.title = striptags(dto.description.split("</p>")[0].split("<p>")[1]);
    const savedTask = await doc.save();
    return EntityToDto(savedTask);
};


export default assembleAndSave;