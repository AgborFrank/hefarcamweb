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

export function CooperativeOnboardingForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cooperativeName: "",
    registrationNumber: "",
    cooperativeLocation: "",
    cooperativeType: "",
    memberCount: "",
    primaryProducts: "",
    yearEstablished: "",
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
      const response = await fetch("/api/onboarding/cooperative", {
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
        <h3 className="text-lg font-semibold mb-4">Cooperative Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cooperativeName">Cooperative Name *</Label>
            <Input
              id="cooperativeName"
              value={formData.cooperativeName}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cooperativeName: e.target.value,
                }))
              }
              placeholder="Enter cooperative name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              value={formData.registrationNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  registrationNumber: e.target.value,
                }))
              }
              placeholder="Enter registration number"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-semibold mb-4">Cooperative Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cooperativeLocation">Location *</Label>
            <Input
              id="cooperativeLocation"
              value={formData.cooperativeLocation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  cooperativeLocation: e.target.value,
                }))
              }
              placeholder="City, State/Province"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cooperativeType">Cooperative Type *</Label>
            <Select
              value={formData.cooperativeType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, cooperativeType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary</SelectItem>
                <SelectItem value="secondary">Secondary</SelectItem>
                <SelectItem value="tertiary">Tertiary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="memberCount">Number of Members</Label>
            <Input
              id="memberCount"
              type="number"
              value={formData.memberCount}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  memberCount: e.target.value,
                }))
              }
              placeholder="0"
              min="1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearEstablished">Year Established</Label>
            <Input
              id="yearEstablished"
              type="number"
              value={formData.yearEstablished}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  yearEstablished: e.target.value,
                }))
              }
              placeholder="YYYY"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        <div className="space-y-2 mt-4">
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
