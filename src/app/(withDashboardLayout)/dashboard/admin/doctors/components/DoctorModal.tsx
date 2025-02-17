import { Button, Grid } from "@mui/material";
import { Gender } from "@/types/common";
import { FieldValues } from "react-hook-form";


import { useCreateDoctorMutation } from "@/redux/api/doctorApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { toast } from "sonner";
import HCForm from "@/components/Forms/HCForm";
import HCInput from "@/components/Forms/HCInput";
import HCFullScreenModal from "@/components/Shared/HCModal/HCFullScreenModal";
import HCSelectField from "@/components/Forms/HCSelectField";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DoctorModal = ({ open, setOpen }: TProps) => {
  const [createDoctor] = useCreateDoctorMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    // console.log(values);
    values.doctor.experience = Number(values.doctor.experience);
    values.doctor.appointmentFee = Number(values.doctor.appointmentFee);
    const data = modifyPayload(values);
    console.log(data)
    try {
      const res = await createDoctor(data).unwrap();
      if (res?.id) {
        toast.success("Doctor created successfully!!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const defaultValues = {
    doctor: {
      email: "",
      name: "",
      contactNumber: "",
      address: "",
      registrationNumber: "",
      gender: "",
      experience: 0,
      apointmentFee: 0,
      qualification: "",
      currentWorkingPlace: "",
      designation: "",
      profilePhoto: "",
    },
    password: "",
  };

  return (
    <HCFullScreenModal open={open} setOpen={setOpen} title="Create New Doctor">
      <HCForm onSubmit={handleFormSubmit} defaultValues={defaultValues}>
        <Grid container spacing={2} sx={{ my: 5 }}>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.name"
              label="Name"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.email"
              type="email"
              label="Email"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="password"
              type="password"
              label="Password"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.contactNumber"
              label="Contract Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.address"
              label="Address"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.registrationNumber"
              label="Registration Number"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.experience"
              type="number"
              label="Experience"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCSelectField
              items={Gender}
              name="doctor.gender"
              label="Gender"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.appointmentFee"
              type="number"
              label="AppointmentFee"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.qualification"
              label="Qualification"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.currentWorkingPlace"
              label="Current Working Place"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <HCInput
              name="doctor.designation"
              label="Designation"
              fullWidth={true}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>

        <Button type="submit">Create</Button>
      </HCForm>
    </HCFullScreenModal>
  );
};

export default DoctorModal;