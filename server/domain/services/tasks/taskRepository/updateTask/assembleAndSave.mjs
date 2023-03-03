import EntityToDto from "../FetchTaskByIdRepository/EntityToDto.mjs";
import sumExistingTime from "./sumExistingTime.mjs";
import striptags from 'striptags';

const assembleAndSave = (dto, res) => (err, doc) => {
    if (err) throw err;

    const existingTime = sumExistingTime(doc);

    const timeOffset = parseInt(dto.time) - existingTime;

    if (timeOffset > 0) {
        doc.time = [
            ...doc.time,
            { date: dto.date, time: timeOffset }
        ];
    }

    doc.description = dto.description;
    doc.date = dto.date;
    doc.contractId = dto.contractId;
    doc.tags = dto.tags;
    doc.title = striptags(dto.description.split("</p>")[0].split("<p>")[1]);
    doc.save((err, task) => {
        res(EntityToDto(task));
    });

};


export default assembleAndSave;