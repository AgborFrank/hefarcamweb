"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function BuyerOnboardingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    businessRegistrationNumber: "",
    companyLocation: "",
    businessType: "",
    companySize: "",
    primaryProducts: "",
    exportDestinations: "",
    annualPurchaseVolume: "",
    currency: "USD",
    contactPersonName: "",
    contactPersonPhone: "",
    contactPersonEmail: "",
    bankAccountNumber: "",
    bankName: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/onboarding/buyer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          primaryProducts: formData.primaryProducts
            .split(",")
            .map((product) => product.trim())
            .filter(Boolean),
          exportDestinations: formData.exportDestinations
            .split(",")
            .map((dest) => dest.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name *</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  companyName: e.target.value,
                }))
              }
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">
              Business Registration Number
            </Label>
            <Input
              id="registrationNumber"
              value={formData.businessRegistrationNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  businessRegistrationNumber: e.target.value,
                }))
              }
              placeholder="Enter registration number"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Business Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyLocation">Company Location *</Label>
            <Input
              id="companyLocation"
              value={formData.companyLocation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  companyLocation: e.target.value,
                }))
              }
              placeholder="City, State/Province"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessType">Business Type *</Label>
            <Select
              value={formData.businessType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, businessType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select business type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exporter">Exporter</SelectItem>
                <SelectItem value="processor">Processor</SelectItem>
                <SelectItem value="wholesaler">Wholesaler</SelectItem>
                <SelectItem value="retailer">Retailer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="companySize">Company Size</Label>
            <Select
              value={formData.companySize}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, companySize: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small (1-50 employees)</SelectItem>
                <SelectItem value="medium">
                  Medium (51-200 employees)
                </SelectItem>
                <SelectItem value="large">Large (200+ employees)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="annualVolume">Annual Purchase Volume</Label>
            <Input
              id="annualVolume"
              type="number"
              value={formData.annualPurchaseVolume}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  annualPurchaseVolume: e.target.value,
                }))
              }
              placeholder="0.00"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="primaryProducts">Primary Products</Label>
            <Input
              id="primaryProducts"
              value={formData.primaryProducts}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  primaryProducts: e.target.value,
                }))
              }
              placeholder="Maize, Coffee, Tea (comma separated)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exportDestinations">Export Destinations</Label>
            <Input
              id="exportDestinations"
              value={formData.exportDestinations}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  exportDestinations: e.target.value,
                }))
              }
              placeholder="USA, UK, Germany (comma separated)"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contactPersonName">Contact Person Name *</Label>
            <Input
              id="contactPersonName"
              value={formData.contactPersonName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactPersonName: e.target.value,
                }))
              }
              placeholder="Full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactPersonPhone">Contact Person Phone *</Label>
            <Input
              id="contactPersonPhone"
              value={formData.contactPersonPhone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactPersonPhone: e.target.value,
                }))
              }
              placeholder="Phone number"
              required
            />
          </div>
        </div>
        <div className="space-y-2 mt-4">
          <Label htmlFor="contactPersonEmail">Contact Person Email</Label>
          <Input
            id="contactPersonEmail"
            type="email"
            value={formData.contactPersonEmail}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                contactPersonEmail: e.target.value,
              }))
            }
            placeholder="email@example.com"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Banking Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={formData.bankName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bankName: e.target.value }))
              }
              placeholder="Enter bank name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="accountNumber">Account Number</Label>
            <Input
              id="accountNumber"
              value={formData.bankAccountNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  bankAccountNumber: e.target.value,
                }))
              }
              placeholder="Enter account number"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="emergencyName">Emergency Contact Name</Label>
            <Input
              id="emergencyName"
              value={formData.emergencyContactName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emergencyContactName: e.target.value,
                }))
              }
              placeholder="Full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
            <Input
              id="emergencyPhone"
              value={formData.emergencyContactPhone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  emergencyContactPhone: e.target.value,
                }))
              }
              placeholder="Phone number"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating Profile..." : "Complete Onboarding"}
        </Button>
      </div>
    </form>
  );
}
