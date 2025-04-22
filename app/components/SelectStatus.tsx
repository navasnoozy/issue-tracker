import { Status } from "@/prisma/client";
import { Select } from "@radix-ui/themes";
import { Controller, useFormContext } from "react-hook-form";

const SelectStatus = ({ status }: { status?: Status }) => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        name="status"
        control={control}
        defaultValue={status || 'OPEN'}
        render={({ field }) => (
          <Select.Root
            defaultValue={field.value || "OPEN"}
            onValueChange={field.onChange}
          >
            <Select.Trigger
              color={
                field.value === "CLOSED"
                  ? "green"
                  : field.value === "IN_PROGRESS"
                  ? "orange"
                  : "red"
              }
              variant="soft"
            />
            <Select.Content>
              <Select.Group>
                <Select.Label>Status</Select.Label>
                {Object.values(Status).map((statusValue) => (
                  <Select.Item  key={statusValue} value={statusValue}>
                    {statusValue.replace("_", " ")}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        )}
      />
    </>
  );
};

export default SelectStatus;

{
  /* <Select.Root onValueChange={handleChange} defaultValue={status}>
<Select.Trigger color={color} variant="soft" />
<Select.Content>
  <Select.Group>
    <Select.Label>Status</Select.Label>
    {Object.values(Status).map((statusValue) => (
      <Select.Item key={statusValue} value={statusValue}>
        {statusValue.replace("_", " ")}
      </Select.Item>
    ))}
  </Select.Group>
</Select.Content>
</Select.Root> */
}
