import axios from "axios";

export const getFollowBookbyUser = async (user_id) => {
    try {
        const res = await axios.get(
            `http://localhost:3000/followedbook/user/${user_id}`, 
            {
                withCredentials: true
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching followed books:", error);
        throw error;
    }
};