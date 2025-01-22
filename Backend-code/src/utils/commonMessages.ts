import { REPLY_TEXT_MAX_LENGTH } from "./reply.constant";

export const errorMessages = {
  Something_weird_happened: "Something weird happened",
  USER_NOT_FOUND: "User not found",
  COMMENT_NOT_FOUND: "Comment not found",
  INVALID_PARAMETER: "Invalid parameter",
  UNABLE_TO_DETERMINE_FILE_TYPE: "Unable to determine file type.",
  UNSUPPORTED_FILE_TYPE: "Unsupported file type.",
  FAILED_TO_GET_IMAGE_DIMENSION: "Failed to get image dimensions.",
  ERROR_CHECKING_IMAGE_RESOLUTION: "Error checking image resolution:",
  SUSPICIOUS_FILENAME_FORMAT: "Suspicious filename format: ",
  FILE_HAS_MULTIPLE_EXTENSIONS: "File has multiple extensions.",
  INVALID_IMAGE_RESOLUTION:
    "Image dimensions are invalid. Expected width between 20px and 5125px, height between 20px and 2885px. ",
  INVALID_VIDEO_SIZE: "Video file size exceeds the maximum allowed size of ",
  ERROR_GETTING_VIDEO_DURATION: "Error getting video duration: ",
  INVALID_VIDEO_DURATION:
    "Video duration exceeds the maximum allowed duration of ",
  UNSUPPORTED_FILE_FORMAT: "Unsupported file format",
  AWS_CREDENTIALS_ERROR:
    "AWS credentials are not properly set in the environment variables.",
  CHANNEL_NOT_FOUND: "Channel not found",
  USER_ID_REQUIRED: "User Id is required",
  USER_ID_AND_CHANNEL_ID_REQUIRED: "User ID and Channel ID are required",
  ERROR_DELETING_MESSAGE_RECIPIENT: "Error deleting message recipient",
  ERROR_UPDATING_MESSAGE_RECIPIENT: "Error updating message recipient",
  ERROR_FINDING_MESSAGE_RECIPIENTS: "Error finding message recipients",
  ERROR_COUNTING_MESSAGE_RECIPIENTS: "Error counting message recipients",
  ERROR_CREATING_MESSAGE_RECIPIENT: "Error creating message recipient",
  MESSAGE_RECIPIENT_NOT_FOUND: "Message recipient not found",
  ERROR_UPLOADING_COVER_PHOTO: "Error uploading cover photo",
  INTERNAL_SERVER_ERROR: "Internal server error",
  NO_CHANNELS_FOUND: "No channels found for this user",
  REQUIRE_USER_ID_AND_CHANNEL_ID: "User ID and Channel ID are required",
  ERROR_UPLOADING_FILE: "Error uploading file",
  FILE_NOT_FOUND: "File not found",
  POST_TYPE_REQUIRED: "Post type is required",
  INAPPROPRIATE_CONTENT: "Post contains inappropriate content",
  FAILED_TO_CREATE_QUESTION: "Failed to create question",
  PARENT_QUESTION_NOT_FOUND: "Parent question not found",
  FAILED_TO_CREATE_COMMENT: "Failed to create comment",
  QUESTION_NOT_FOUND: "Question not found",
  FAILED_TO_FETCH_QUESTION_OR_COMMENT: "Failed to fetch question or comments",
  FAILED_TO_TOGGLE_LIKE: "Failed to toggle like",
  FAILED_TO_FETCH_QUESTIONS: "Failed to fetch questions",
  ERROR_FETCHING_QUESTION_WITH_ANSWERS: "Error fetching question and answers",
  UNAUTHORIZED: "Unauthorized",
  UNAUTHORIZED_OPERATION: "Unauthorized operation",
  QUESTION_DELETED: "Question deleted successfully",
  FAILED_TO_DELETE_QUESTION: "Failed to delete question",
  FAILED_TO_SHARE_QUESTION: "Failed to share question",
  FAILED_TO_CREATE_ANSWER: "Failed to create answer",
  ANSWER_NOT_FOUND: "Answer not found",
  FAILED_TO_CREATE_COMMENT_ON_ANSWER: "Failed to create comment on answer",
  NO_COMMENT_FOUND_ON_THIS_ANSWER: "No comments found for this answer",
  ERROR_FETCHING_COMMENT_ON_THIS_ANSWER:
    "Error fetching comments on the answer",
  FAILED_TO_SHARE_ANSWER: "Failed to share answer",
  FAILED_TO_FETCH_ANSWER: "Failed to fetch answers",
  FAILED_TO_DELETE_ANSWER: "Failed to delete answer",
  ANSWER_DELETED: "Answer deleted successfully",
  FAILED_TO_UPVOTE_ANSWER: "Failed to upvote answer",
  ONLY_QUESTION_CREATOR_CAN_UPVOTE_ANSWER: "Only question creator can upvote",
  FAILED_TO_RETRIVE_QUESTION_DETAILS_FOR_ANSWER:
    "Failed to retrieve question details for answer",
  POST_TEXT_EXCEED_LIMIT: "Post text exceeds maximum length (2200 characters)",
  POST_NOT_FOUND: "Post not found",
  AHA_POST_NOT_FOUND: "AHA-Post not found",
  AHA_POST_TEXT_EXCEED_LIMIT:
    "AHA-Post text exceeds maximum length (2200 characters)",
  AHA_POST_TITLE_TEXT_REQUIRED: "Title and text are required",
  PARENT_AHA_POST_NOT_FOUND: "Parent AHA Post not found",
  FAILED_TO_CREATE_COMMENT_ON_AHA_POST: "Failed to create comment on AHA-Post",
  NO_COMMENT_FOUND_ON_THIS_AHA_POST: "No comment found on this AHA-Post",
  FAILED_TO_CHANGE_LIKE_STATUS: "Failed to change like status",
  FAILED_TO_SHARE_AHA_POST: "Failed to share AHA-Post",
  USER_IDS_REQUIRED: "User ids required",
  NO_USERS_FOUND: "No users found",
  ANSWER_ALREADY_PICKED: "An answer has already been picked for this question.",
  KARMA_POINT_STAUS_ERROR: "HTTP error! status: ",
  ERROR_POSTING_KARMA_POINTS: "Error posting karma points:",
  FAILED_TO_PICK_ANSWER: "Error on picking the answer",
  UNAUTHORIZED_OR_ALREADY_ANSWERED: "unauthorized user or already anwered",
  REQUIRED_ATLEAST_ONE_FIELD: "required at least one field",
  ATTENDEE_NOT_FOUND: "attendee not found",
  USER_ALREADY_REMOVED: "user already removed",
  USER_ALREADY_IN_CHANNEL: "user already in channel",
  INVALID_ANSWER_ID: "Invalid answer Id",
  UNAUTHORIZED_TO_UPDATE_ANSWER: "Unauthorized to update answer",
  INVALID_QUESTION_ID: "Invalid question Id",
  UNAUTHORIZED_TO_UPDATE_QUESTION: "Unauthorized to update answer",
  ERROR_FETCHING_COMMENT_ON_AHAPOST: "Error fetching comments on AHAPost",
  FAILED_TO_NOTIFY_EXTERNAL_SERVICE: "Failed to notify external service",
  MESSAGE_NOT_FOUND: "Message not found",
  ERROR_FETCHING_MESSAGE_WITH_READ_STATUS:
    "Error fetching messages with read status",
  ERROR_MARKING_MESSAGE_AS_READ: "Error marking message as read",
  NO_READ_RECORD_FOUND_TO_MARK_UNREAD:
    "No read record found to mark as unread.",
  ERROR_MARKING_MESSAGE_UNREAD: "Error marking message as unread.",
  USER_OR_POST_NOT_FOUND: "User Or Post not Found!",
  POST_EDIT_FAILED: "Post editing failed",
  MESSAGE_UPDATED: "Message Not Found or Already Read!",
  POST_ALREADY_SAVED: "Post Already Saved!",
  WALLET_ADDRESS_REQUIRED: "walletAddress is required",
  DELETE_FAILED: "Failed to delete Post!",
  USERNAME_ALREADY_EXIST: "Username Already Exist",
  EMAIL_ALREADY_SET: "Email is already set to this value",
  NAME_ALREADY_SET: "Name is already set to this value",
  USERNAME_ALREADY_SET: "Username is already set to this value",
  REQUIRED_FIELDS: "Required fields",
  PASSWORD_DONT_MATCH: "Passwords do not match",
  CURRENT_PASSWORD_ERROR:
    "New password cannot be the same as the current password",
  FEED_NOT_FOUND: "Feed not found",
  INVALID_TARGET_TYPE: "Invalid target type",
  TARGET_DOES_NOT_EXIST: "Target does not exist",
  COULD_NOT_FETCH: "Could not fetch",
  NO_LIKED_ITEMS_FOUND: "No liked items found",
  REPLY_TEXT_MAX_LENGTH_EXCEEDED: `Reply text exceeds maximum length (${REPLY_TEXT_MAX_LENGTH} characters)`,
  REPLY_NOT_FOUND: 'Reply not found',
  USER_OR_REPLY_NOT_FOUND: 'User or Reply not found',
  ERROR_CREATING_REPLY: 'Error creating reply',
  ERROR_FETCHING_REPLIES: 'Error fetching replies',
  ERROR_UPDATING_REPLY: 'Error updating reply',
  ERROR_DELETING_REPLY: 'Error deleting reply',
  UNEXPECTED_ERROR : 'An unexpected error occurred.',
  PRODUCT_ID_REQUIRED_ERROR : 'Invalid Product ID format',
  PRODUCT_NOT_FOUND : 'Product not found',
  INSUFFICIENT_FUNDS_ERROR : 'Insufficient Funds',
  PAYMENT_FAIL_STATUS_ERROR :  'Payment failed error',
  TOKEN_TRANSFER_FAILED_ERROR : 'Failed to transfer tokens',
  INVALID_WALLET_ADDRESS : 'Invalid ethereum address',
  NOT_IMPLEMENTED_ERROR : 'Method not implemented.',
  WALLET_ALREADY_EXIST: "Wallet Already Exist",
  INVALID_SIGNATURE :'Invalid signature'
};

export const successMessages = {
  POST_FETCHED_SUCCESSFULLY: "Post fetched successfully",
  CHANNEL_CREATED: "Channel created successfully",
  ATTENDEE_ADDED: "Attendee added successfully",
  ATTENDEE_REMOVED: "Attendee removed successfully",
  FILE_UPLOADED: "File uploaded successfully",
  IMAGE_UPLOADED_SUCCESSFULLY: "Image uploaded successfully",
  POST_SUCCESS: "Post created successfully",
  USER_SUCCESS: "User created successfully",
  AHA_POST_CREATED: "AHA-Post created successfully",
  AHA_POST_UPDATED: "AHA-Post updated successfully",
  AHA_POST_DELETED: "AHA-Post deleted successfully",
  ANSWER_PICKED: "Answer picked for the question",
  POST_DELETED_SUCCESSFULLY: "Post deleted successfully",
  ANSWER_UPDATED_SUCCESSFULLY: "Answer updated successfully",
  QUESTION_UPDATED_SUCCESSFULLY: "Question updated successfully",
  MESSAGE_READ: "Message read",
  MESSAGE_MARK_UNREAD: "Message marked as unread successfully.",
  USER_DETAILS_UPDATED_SUCCESSFULLY: "User details updated successfully",
  USER_SAVED_POSTS_LIST_FETCHED: "User saved Post List fetched Successfully!",
  POST_SAVED: "Post Saved Successfully",
  POST_UNSAVED: "Post Unsaved Successfully",
  POST_CREATED: "Post Created Successfully",
  POST_EDIT_SUCCESS: "Post edited successfully",
  PASSWORD_UPDATE_SUCCESS: "Password updated successfully",
  REPOST_UNDONE: "Repost undone successfully",
  REPOST_DONE: "Repost done successfully",
  TOP_USERS_FETCHED: "Top Users fetched Successfully",
  REPLY_CREATED: 'Reply created successfully',
  REPLY_UPDATED: 'Reply updated successfully',
  REPLY_DELETED: 'Reply deleted successfully',
  USER_KARMA_POINT_FETCHED: 'User karma point list',
  USER_KARMA_POINT_ADDED: 'User karma point added!',
  PRODUCT_PURCHASED:'Product purchased successfully',
  WALLET_DETAILS_UPDATED : 'Wallet details updated Successfully'
};
