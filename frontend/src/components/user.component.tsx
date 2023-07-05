import { FC } from "react";
import { IUser } from "../redux/api/types";
import { Box } from "@mui/material";


interface IUserItemProps {
    user: IUser;
  }
  
  const UserItem: FC<IUserItemProps> = ({ user }) => {
    return (<Box sx={{
        padding: '1rem',
        backgroundColor: 'lightblue',
        margin: '1rem'
      }}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
    </Box>
    );

  };

  export default UserItem;