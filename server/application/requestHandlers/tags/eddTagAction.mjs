import TagService from "../../../domain/services/tags/TagService.mjs";
import RequestToTagDto from "./assemblers/RequestToTagDto.mjs";

export const addTagAction = async (req, res) => {
    const dto = RequestToTagDto(req);
    const tag = await TagService.addTag(dto);
    res.jsonp(tag);
};