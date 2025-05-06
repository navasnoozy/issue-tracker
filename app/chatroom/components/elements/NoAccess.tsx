import { Box, Button, Popover } from "@radix-ui/themes";

const NoAccess = () => {
  return (
    <Box position="fixed" bottom="4" right="4">
      <Popover.Root>
        <Popover.Trigger>
          <Button className="!rounded-full" size={{ initial: "3", md: "4" }}>
            Chat Rooms
          </Button>
        </Popover.Trigger>

        <Popover.Content
          width="360px"
          minHeight="50vh"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Login first to access chat Rooms
        </Popover.Content>
      </Popover.Root>
    </Box>
  );
};

export default NoAccess;
