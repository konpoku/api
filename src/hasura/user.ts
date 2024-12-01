import { gql } from "graphql-request";
import { client } from "..";

/**
 * Update user profile
 * @param uuid user uuid
 * @param class user class
 * @param department user department
 * @param phone user phone
 * @param realname user realname
 * @param student_no user student_no
 * @param username user username
 * @returns updated_at
 */
export const update_user_profile = async (uuid: string, updateFields: Partial<{class: string, department: string, phone: string, realname: string, student_no: string, username: string}>) => {
  if(Object.keys(updateFields).length === 0) return null;
  const setFields: any = {};
  if(updateFields.class) setFields.class = updateFields.class;
  if(updateFields.department) setFields.department = updateFields.department;
  if(updateFields.phone) setFields.phone = updateFields.phone;
  if(updateFields.realname) setFields.realname = updateFields.realname;
  if(updateFields.student_no) setFields.student_no = updateFields.student_no;
  if(updateFields.username) setFields.username = updateFields.username;
  const variablesString = Object.keys(setFields)
  .map(key => `$${key} : String`)
  .join('\n');
  const setString = Object.keys(setFields)
  .map(key => `${key}: $${key}`)
  .join('\n');
  const mutation = gql`
    mutation UpdateProfile($uuid: uuid!
       ${variablesString}) {
      update_users_by_pk(pk_columns: {uuid: $uuid }
        _set: { ${setString} }
        ) {
        updated_at
      }
    }
  `;
  console.log(mutation);
  const variables: {[key: string]: any} = {
    uuid: uuid,
    class: updateFields.class,
    department: updateFields.department,
    phone: updateFields.phone,
    realname: updateFields.realname,
    student_no: updateFields.student_no,
    username: updateFields.username
  };
  try {
    const response: any = await client.request(mutation, variables);
    return response.update_users_by_pk?.updated_at ?? null;
  } catch (error) {
    console.error('Error updating user profile', error);
    throw error;
  }
}
