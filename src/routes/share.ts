import express from "express";
import authenticate from "../middlewares/authenticate";
import * as ShareFunc from "../hasura/share";

const router = express.Router();// 获取分享列表

// 课程评论相关路由
router.get("/course/comment/add", authenticate(),async (req, res) => {
    const comment : string = req.body.comment;
    const user_uuid : string = req.body.user_uuid;
    const course_uuid : string = req.body.course_uuid;
    const parent_uuid : string = req.body.parent_uuid;
    if (!comment || !user_uuid || !course_uuid || !parent_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const comment_uuid = await ShareFunc.add_course_comment_one(comment, user_uuid, course_uuid, parent_uuid);
    if (!comment_uuid) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(comment_uuid);
});

router.get("/course/comment/add_stars", authenticate(),async (req, res) => {
    const user_uuid : string = req.body.user_uuid;
    const comment_uuid : string = req.body.comment_uuid;
    if (!user_uuid || !comment_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.add_course_comment_stars(comment_uuid,user_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/comment/add_likes", authenticate(),async (req, res) => {
    const user_uuid : string = req.body.user_uuid;
    const comment_uuid : string = req.body.comment_uuid;
    if (!user_uuid || !comment_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.add_course_comment_likes(comment_uuid,user_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/comment/update", authenticate(),async (req, res) => {
    const comment_uuid : string = req.body.comment_uuid;
    const comment : string = req.body.comment;
    if (!comment_uuid || !comment) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.update_course_comment(comment,comment_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/comment/delete", authenticate(),async (req, res) => {
    const comment_uuid : string = req.body.comment_uuid;
    if (!comment_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.delete_course_comment_one(comment_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/comment/get", authenticate(),async (req, res) => {
    const comment_uuid : string = req.body.comment_uuid;
    if (!comment_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.delete_course_comment_one(comment_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/comment/delete_stars", authenticate(),async (req, res) => {
    const user_uuid : string = req.body.user_uuid;
    const comment_uuid : string = req.body.comment_uuid;
    if (!user_uuid || !comment_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.delete_course_comment_stars(comment_uuid,user_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/comment/delete_likes", authenticate(),async (req, res) => {
    const user_uuid : string = req.body.user_uuid;
    const comment_uuid : string = req.body.comment_uuid;
    if (!user_uuid || !comment_uuid) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.delete_course_comment_likes(comment_uuid,user_uuid);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("/course/info/update", authenticate(),async (req, res) => {
    const course_uuid : string = req.body.course_uuid;
    const key : string = req.body.key;
    const value : string = req.body.value;
    if (!course_uuid || !key || !value) {
        return res.status(422).send("422 Unprocessable Entity: Missing credentials");
    }
    const result = await ShareFunc.update_course_info(course_uuid,key,value);
    if (!result) {
        return res.status(500).send("Internal Server Error");
    }
    return res.status(200).send(result);
});

router.get("")