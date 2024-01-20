import { Box } from "@mui/material";
import ProfileDetails from "../components/Profile/ProfileDetails";
import ProfileHeader from "../components/Profile/ProfileHeader";

export default function ProfilePage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "0rem 10rem",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            columnGap: "3rem",
            height: "fit-content",
            alignItems: "center",
            width: "100%",
            boxShadow: 3,
            padding: "2rem",
          }}
        >
          <ProfileHeader />
          <ProfileDetails />
        </Box>
      </div>
    </>
  );
}
