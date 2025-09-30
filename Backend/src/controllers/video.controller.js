import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body
    // TODO: get video, upload to cloudinary, create video
    if(!title  || ! description){
        throw ApiError(400, "Title and description are required")
    }
    if(!req.file || !req.file.videoFile || !req.file.thumbnail){
        throw ApiError(400, "Video file and thumbnail are required")
    }
    const videoFile = req.file.videoFile[0].path
    const thumbnail = req.file.thumbnail[0].path

    const uploadVideo = await uploadOnCloudinary(videoFile);
    const uploadThumbnail = await uploadOnCloudinary(thumbnail);

    if(!uploadVideo || !uploadThumbnail){
        throw ApiError(500, "Error uploading video or thumbnail")
    }

    const newVideo = Video.create({
        title,
        description,
        videoFile : uploadVideo.secure_url,
        thumbnail : uploadThumbnail.secure_url,
        duration : req.file.videoFile[0].duration, // cloudinary give you the video duration 
        owner : req.user._id
        
    })
    return res
    .status(201)
    .json(
        new ApiResponse(201, "Video published successfully", newVideo) 
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
