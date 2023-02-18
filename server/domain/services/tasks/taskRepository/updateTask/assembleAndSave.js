const EntityToDto = require("../FetchTaskByIdRepository/EntityToDto");
const sumExistingTime = require("./sumExistingTime");
var striptags = require('striptags');

module.exports = (dto, res) => (err, doc) => {
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