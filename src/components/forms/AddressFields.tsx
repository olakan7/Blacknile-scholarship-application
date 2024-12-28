import FormField from './FormField';

export default function AddressFields() {
  return (
    <div className="space-y-4">
      <FormField
        name="address.street"
        label="Street Address"
        required
        placeholder="123 Main St"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="address.city"
          label="City"
          required
        />
        <FormField
          name="address.state"
          label="State/Province"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          name="address.zipCode"
          label="ZIP / Postal Code"
          placeholder="12345"
        />
        <FormField
          name="address.country"
          label="Country"
          required
        />
      </div>
    </div>
  );
}