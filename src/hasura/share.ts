import { gql } from "graphql-request";
import { client } from "..";

/**
  ============================================================================
  ============================ QUERY FUNCTIONS ===============================
  ============================================================================
 */

/**
  ============================================================================
  ============================ INSERT FUNCTIONS ==============================
  ============================================================================
 */

  /**
 * Add a course comment
 * @param {string} comment - The content of the comment
 * @param {string} user_uuid - The UUID of the user
 * @param {string} course_uuid - The UUID of the course
 * @param {string} parent_uuid - The UUID of the parent comment
 * @returns {Promise<string | undefined>} - The UUID of the new comment
 */
export const add_course_comment_one = async(comment: string, user_uuid: string, course_uuid: string, parent_uuid: string): Promise<string | undefined> => {
    const add_course_comment_one_query: { insert_course_comment_one?: { uuid: string } } = await client.request(
        gql`
        mutation AddCourseCommentOne(
            $comment: String!
            $user_uuid: uuid!
            $course_uuid: uuid!
            $parent_uuid: uuid
        ) {
            insert_course_comment_one(
            object: {
                comment: $comment
                course_id: $course_uuid
                user_uuid: $user_uuid
                parent_uuid: $parent_uuid
            }
            ) {
            uuid
            }
        }`,
    {
        comment: comment,
        user_uuid: user_uuid,
        course_uuid: course_uuid,
        parent_uuid: parent_uuid
    }
    );
    return add_course_comment_one_query?.insert_course_comment_one?.uuid;
}

/**
 * Add stars to a course comment
 * @param {string} comment_uuid - The UUID of the comment
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the comment
 */
export const add_course_comment_stars = async(comment_uuid: string, user_uuid: string): Promise<string | undefined> => {
    const add_course_comment_stars_query: { insert_course_comment_stars_one?: { comment_uuid: string } } = await client.request(
        gql`
        mutation AddCourseCommentStars($comment_uuid: uuid!, $user_uuid: uuid!) {
            insert_course_comment_stars_one(
                object: { comment_uuid: $comment_uuid, user_uuid: $user_uuid }
                on_conflict: { constraint: course_comment_star_pkey, update_columns: [] }
            ) {
            comment_uuid
            }
        }`,
        {
            comment_uuid: comment_uuid,
            user_uuid: user_uuid
        }
    );
    return add_course_comment_stars_query?.insert_course_comment_stars_one?.comment_uuid;
}


/**
 * Add likes to a course comment
 * @param {string} comment_uuid - The UUID of the comment
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the comment
 */
export const add_course_comment_likes = async(comment_uuid: string, user_uuid: string): Promise<string | undefined> => {
    const add_course_comment_likes_query: { insert_course_comment_likes_one?: { comment_uuid: string } } = await client.request(
        gql`
        mutation AddCourseCommentLikes($comment_uuid: uuid!, $user_uuid: uuid!) {
            insert_course_comment_likes_one(
                object: { comment_uuid: $comment_uuid, user_uuid: $user_uuid }
                on_conflict: { constraint: course_comment_likes_pkey, update_columns: [] }
            ) {
            comment_uuid
            }
        }`,
        {
            comment_uuid: comment_uuid,
            user_uuid: user_uuid
        }
    );
    return add_course_comment_likes_query?.insert_course_comment_likes_one?.comment_uuid;
}

/**
  ============================================================================
  ============================ UPDATE FUNCTIONS ==============================
  ============================================================================
 */

  /**
 * Update a course comment
 * @param {string} comment - The new content of the comment
 * @param {string} uuid - The UUID of the comment
 * @returns {Promise<string | undefined>} - The UUID of the updated comment
 */
export const update_course_comment = async (comment: string, uuid: string): Promise<string | undefined> => {
    const update_course_comment_query: any = await client.request(
        gql`
        mutation UpdateCourseComment($comment: String!, $uuid: uuid!) {
            update_course_comment_by_pk(
            pk_columns: { uuid: $uuid }
            _set: { comment: $comment }
            ) {
            uuid
            }
        }`,
        {
            uuid: uuid,
            comment: comment
        }
    );
    return update_course_comment_query?.update_course_comment_by_pk?.uuid;
}

/**
  ============================================================================
  ============================ DELETE FUNCTIONS ==============================
  ============================================================================
 */

/**
 * Soft delete a course comment
 * @param {string} uuid - The UUID of the comment
 * @returns {Promise<string | undefined>} - The UUID of the deleted comment
 */
export const delete_course_comment_one = async (uuid: string): Promise<string | undefined> => {
    const delete_course_comment_one_query: { update_course_comment_by_pk?: { uuid: string } } = await client.request(
        gql`
        mutation DeleteCourseCommentOne($uuid: uuid!) {
            update_course_comment_by_pk(
                pk_columns: { uuid: $uuid }
                _set: { deleted: true }
            ) {
                uuid
            }
        }`,
        {
            uuid: uuid
        }
    );
    return delete_course_comment_one_query?.update_course_comment_by_pk?.uuid;
}

/**
 * Delete stars from a course comment
 * @param {string} comment_uuid - The UUID of the comment
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the comment
 */
export const delete_course_comment_stars = async (comment_uuid: string, user_uuid: string): Promise<string | undefined> => {
    const delete_course_comment_stars_query: { delete_course_comment_stars_by_pk?: { comment_uuid: string } } = await client.request(
        gql`
        mutation DeleteCourseCommentStars($comment_uuid: uuid!, $user_uuid: uuid!) {
            delete_course_comment_stars_by_pk(
            comment_uuid: $comment_uuid
            user_uuid: $user_uuid
            ) {
            comment_uuid
            }
        }`,
        {
            comment_uuid: comment_uuid,
            user_uuid: user_uuid
        }
    );
    return delete_course_comment_stars_query?.delete_course_comment_stars_by_pk?.comment_uuid;
}

/**
 * Delete likes from a course comment
 * @param {string} comment_uuid - The UUID of the comment
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the comment
 */
export const delete_course_comment_likes = async(comment_uuid: string, user_uuid: string): Promise<string | undefined> => {
    const delete_course_comment_likes_query: { delete_course_comment_likes_by_pk?: { comment_uuid: string } } = await client.request(
        gql`
        mutation DeleteCourseCommentLikes($comment_uuid: uuid!, $user_uuid: uuid!) {
            delete_course_comment_likes_by_pk(
            comment_uuid: $comment_uuid
            user_uuid: $user_uuid
            ) {
            comment_uuid
            }
        }`,
        {
            comment_uuid: comment_uuid,
            user_uuid: user_uuid
        }
    );
    return delete_course_comment_likes_query?.delete_course_comment_likes_by_pk?.comment_uuid;
}
//newly added
//TODO:Find out what does this do
/**
 * Update the course info
 * @param {string} course_id - The UUID of the course
 * @param {string} key - The key of the course info
 * @param {string} value - The value of the course info
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const update_course_info = async (course_id: string, key: string, value: string): Promise<string | undefined> => {
    const update_course_info_query: any = await client.request(
        gql`
        mutation UpdateCourseInfo($course_id: uuid!, $key: String!, $value: String!) {
          update_course_info_by_pk(pk_columns: {course_id: $course_id, key: $key}, _set: {value: $value}) {
            course_id
          }
        }
        `,
        {
            uuid: course_id,
            key: key,
            value: value
        }
    );
    return update_course_info_query?.update_course_info_by_pk?.course_id;
}

/**
 * Add course info
 * @param {string} course_id - The UUID of the course
 * @param {string} key - The key of the course info
 * @param {string} value - The value of the course info
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const add_course_info = async (course_id: string, key: string, value: string): Promise<string | undefined> => {
    const add_course_info_query: any = await client.request(
        gql`
        mutation AddCourseInfo($course_id: uuid!, $key: String!, $value: String!) {
          insert_course_info_one(object: {course_id: $course_id, key: $key, value: $value}) {
            course_id
          }
        }
        `,
        {
            course_id: course_id,
            key: key,
            value: value
        }
    );
    return add_course_info_query?.insert_course_info_one?.course_id;
}

/**
 * Delete course info
 * @param {string} course_id - The UUID of the course
 * @param {string} key - The key of the course info
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const delete_course_info = async (course_id: string, key: string): Promise<string | undefined> => {
    const delete_course_info_query: any = await client.request(
        gql`
        mutation DeleteCourseInfo($course_id: uuid!, $key: String!) {
          delete_course_info_by_pk(course_id: $course_id, key: $key) {
            course_id
            key
          }
        }
        `,
        {
            course_id: course_id,
            key: key
        }
    );
    return delete_course_info_query?.delete_course_info_by_pk;
}

/**
 * Add course rating
 * @param {string} course_id - The UUID of the course
 * @param {string} dim1 - The rating of dimension 1
 * @param {string} dim2 - The rating of dimension 2
 * @param {string} dim3 - The rating of dimension 3
 * @param {string} dim4 - The rating of dimension 4
 * @param {string} dim5 - The rating of dimension 5
 * @param {string} dim6 - The rating of dimension 6
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const add_course_rating = async (course_id: string, dim1: number, dim2: number, dim3: number, dim4: number, dim5: number, dim6: number, user_uuid: string): Promise<string | undefined> => {
    const add_course_rating_query: any = await client.request(
        gql`
        mutation AddCourseRating(
          $dim1: Int!,
          $dim2: Int!,
          $dim3: Int!,
          $dim4: Int!,
          $dim5: Int!,
          $dim6: Int!,
          $course_id: uuid!,
          $user_uuid: uuid!
          ) {
          insert_course_rating_one(object: {
            dim1: $dim1,
            dim2: $dim2,
            dim3: $dim3,
            dim4: $dim4,
            dim5: $dim5,
            dim6: $dim6,
            course_id: $course_id,
            user_uuid: $user_uuid
            }
            ) {
            created_at
          }
        }
        `,
        {
            course_id: course_id,
            dim1: dim1,
            dim2: dim2,
            dim3: dim3,
            dim4: dim4,
            dim5: dim5,
            dim6: dim6,
            user_uuid: user_uuid
        }
    );
    return add_course_rating_query?.insert_course_rating_one?.created_at;
}

/**
 * Update course rating
 * @param {string} course_id - The UUID of the course
 * @param {string} dim1 - The rating of dimension 1
 * @param {string} dim2 - The rating of dimension 2
 * @param {string} dim3 - The rating of dimension 3
 * @param {string} dim4 - The rating of dimension 4
 * @param {string} dim5 - The rating of dimension 5
 * @param {string} dim6 - The rating of dimension 6
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const update_course_rating = async (course_id: string, dim1: number, dim2: number, dim3: number, dim4: number, dim5: number, dim6: number, user_uuid: string): Promise<string | undefined> => {
    const update_course_rating_query: any = await client.request(
        gql`
       mutation UpdateCourseRating(
          $course_id: uuid!,
          $user_uuid: uuid!,
          $dim1: Int!,
          $dim2: Int!,
          $dim3: Int!,
          $dim4: Int!,
          $dim5: Int!,
          $dim6: Int!) {
          update_course_rating_by_pk(
            pk_columns: {
            course_id: $course_id,
            user_uuid: $user_uuid},
             _set: {
              dim1: $dim1,
              dim2: $dim2,
              dim3: $dim3,
              dim4: $dim4,
              dim5: $dim5,
              dim6: $dim6
              }
            ) {
            updated_at
          }
        }
        `,
        {
            course_id: course_id,
            dim1: dim1,
            dim2: dim2,
            dim3: dim3,
            dim4: dim4,
            dim5: dim5,
            dim6: dim6,
            user_uuid: user_uuid
        }
    );
    return update_course_rating_query?.update_course_rating_by_pk?.updated_at;
}

/**
 * Delete course rating
 * @param {string} course_id - The UUID of the course
 * @param {string} user_uuid - The UUID of the user
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const delete_course_rating = async (course_id: string, user_uuid: string): Promise<string | undefined> => {
    const delete_course_rating_query: any = await client.request(
        gql`
        mutation DeleteCourseRating($course_id: uuid!, $user_uuid: uuid!) {
          delete_course_rating_by_pk(course_id: $course_id, user_uuid: $user_uuid) {
            course_id
            user_uuid
          }
        }
        `,
        {
            course_id: course_id,
            user_uuid: user_uuid
        }
    );
    return delete_course_rating_query?.delete_course_rating_by_pk;
}

/**
 * update course
 * @param {string} uuid - The UUID of the course
 * @param {string} code - The code of the course
 * @param {string} fullname - The full name of the course
 * @param {string} language - The language of the course
 * @param {string} name - The name of the course
 * @param {string} professor - The professor of the course
 * @param {string} semester - The semester of the course
 * @param {string} type - The type of the course
 * @param {number} year - The year of the course
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const update_course = async (uuid: string, code: string, fullname: string, language: string, name: string, professor: string, semester: string, type: string, year: number): Promise<string | undefined> => {
    const update_course_query: any = await client.request(
        gql`
       mutation UpdateCourse(
          $code: String!,
          $uuid: uuid!,
          $fullname: String!,
          $language: String!,
          $name: String!,
          $professor: String!,
          $semester: String!,
          $type: String!,
          $year: Int!
          ) {
          update_course_by_pk(
            pk_columns: {uuid: $uuid},
            _set: {
              code: $code,
              fullname: $fullname,
              language: $language,
              name: $name,
              professor: $professor,
              semester: $semester,
              type: $type,
              year: $year
            }
          ) {
            uuid
          }
        }`,
        {
            uuid: uuid,
            code: code,
            fullname: fullname,
            language: language,
            name: name,
            professor: professor,
            semester: semester,
            type: type,
            year: year
        }
    );
    return update_course_query?.update_course_by_pk?.uuid;
}

/**
 * Add course
 * @param {string} code - The code of the course
 * @param {string} fullname - The full name of the course
 * @param {string} language - The language of the course
 * @param {string} name - The name of the course
 * @param {string} professor - The professor of the course
 * @param {string} semester - The semester of the course
 * @param {string} type - The type of the course
 * @param {number} year - The year of the course
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const add_course = async (code: string, fullname: string, language: string, name: string, professor: string, semester: string, type: string, year: number): Promise<string | undefined> => {
    const add_course_query: any = await client.request(
        gql`
        mutation AddCourse(
          $year: Int!,
          $type: String!,
          $semester: String!,
          $professor: String!,
          $name: String!,
          $language: String!,
          $fullname: String!,
          $code: String!
        ) {
          insert_course(
            objects: {
              code: $code,
              fullname: $fullname,
              language: $language,
              name: $name,
              professor: $professor,
              semester: $semester,
              type: $type,
              year: $year
            }
          ) {
            returning {
              uuid
            }
          }
        }`,
        {
            code: code,
            fullname: fullname,
            language: language,
            name: name,
            professor: professor,
            semester: semester,
            type: type,
            year: year
        }
    );
    return add_course_query?.insert_course?.uuid;
}

/**
 * Delete course
 * @param {string} uuid - The UUID of the course
 * @returns {Promise<string | undefined>} - The UUID of the course
 */
export const delete_course = async (uuid: string): Promise<string | undefined> => {
    const delete_course_query: any = await client.request(
        gql`
        mutation DeleteCourse($uuid: uuid!) {
          delete_course_by_pk(uuid: $uuid) {
            uuid
          }
        }`,
        {
            uuid: uuid
        }
    );
    return delete_course_query?.delete_course_by_pk?.uuid;
}