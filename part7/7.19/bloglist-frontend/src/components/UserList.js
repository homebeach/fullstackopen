import { Link } from "react-router-dom";

const UserList = ({ users }) => (
  <>
    <h1>Users</h1>
    {users && users.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div>
                  <Link to={`/user/${user.id}`}>
                    {user.username}
                  </Link>
                </div>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No users available</p>
    )}
  </>
);

export default UserList;
