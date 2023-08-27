import React, { useState } from "react";
import InputField from "../Input/InputComponent";
import Button from "../Button/Button";
import { setStep1Data } from "../../store/userSlice";
import { useDispatch } from "react-redux";

interface BasicDetailsStepProps {
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

interface AddressDetails {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

const BasicDetailsStep: React.FC<BasicDetailsStepProps> = ({
  onNext,
  onCancel,
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleAddressChange = (field: keyof AddressDetails, value: string) => {
    setAddressDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };
  
  const handleNext = () => {
    const basicDetailsData = {
      name,
      email,
      phone,
      addressDetails,
    };

    dispatch(setStep1Data(basicDetailsData));
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-semibold mb-4">Step 1: Basic Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <InputField
          label="Name"
          id="name"
          type="text"
          name="name"
          register={() => {}}
          placeholder="Name"
          required
          pattern={/^[A-Za-z]+$/i}
          onChange={(value) => {
            setName(value);
          }}
        />

        <InputField
          label="Email Address"
          id="email"
          type="email"
          name="email"
          register={() => {}}
          placeholder="Email Address"
          value={email}
          onChange={(value) => {
            setEmail(value);
          }}
        />
        <InputField
          label="Phone Number"
          id="phone"
          type="tel"
          name="phone"
          register={() => {}}
          placeholder="Phone Number"
          value={phone}
          onChange={(value) => {
            setPhone(value);
          }}
        />
        <InputField
          label="Address Line 1"
          id="addressLine1"
          type="text"
          name="addressLine1"
          register={() => {}}
          placeholder="Address Line 1"
          value={addressDetails.addressLine1}
          onChange={(value) => {
            handleAddressChange("addressLine1", value);
          }}
        />
        <InputField
          label="Address Line 2"
          id="addressLine2"
          type="text"
          name="addressLine2"
          register={() => {}}
          placeholder="Address Line 2"
          value={addressDetails.addressLine2}
          onChange={(value) => {
            handleAddressChange("addressLine2", value);
          }}
        />
        <InputField
          label="City"
          id="city"
          type="text"
          name="city"
          register={() => {}}
          placeholder="City"
          value={addressDetails.city}
          onChange={(value) => {
            handleAddressChange("city", value);
          }}
        />
        <InputField
          label="State"
          id="state"
          type="text"
          name="state"
          register={() => {}}
          placeholder="State"
          value={addressDetails.state}
          onChange={(value) => {
            handleAddressChange("state", value);
          }}
        />
        <InputField
          label="Pincode"
          id="pincode"
          type="text"
          name="pincode"
          register={() => {}}
          placeholder="Pincode"
          value={addressDetails.pincode}
          onChange={(value) => {
            handleAddressChange("pincode", value);
          }}
        />
        <InputField
          label="Country"
          id="country"
          type="text"
          name="country"
          register={() => {}}
          placeholder="Country"
          value={addressDetails.country}
          onChange={(value) => {
            handleAddressChange("country", value);
          }}
        />
      </div>
      <div className="flex justify-between w-full max-w-lg mt-4">
        <Button
          label="Cancel"
          onClick={onCancel}
          className="bg-red-400 hover:bg-red-500"
        />
        <Button
          label="Next"
          onClick={handleNext}
          className="bg-green-400 hover:bg-green-500"
        />
      </div>
    </div>
  );
};

export default BasicDetailsStep;
