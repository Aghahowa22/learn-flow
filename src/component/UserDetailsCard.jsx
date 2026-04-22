import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseconfig";
import { Trash2, PenLine, Check, X } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const UserDetailsCard = ({ note }) => {
  // State to manage the user details and deletion process
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    phoneNumber: note.phoneNumber || "",
    address: note.address || "",
    occupation: note.occupation || "",
  });
  const [updateError, setUpdateError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);


  // Function to handle user deletion
  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000); // Reset confirmation after 3 seconds
      return;
    }
    setDeleteError(null);

    try {
      setDeleting(true);
      await deleteDoc(doc(db, "users", note.id));
      alert("User details deleted successfully!");
      
    } catch (error) {
      console.error("Error deleting user details:", error);
      setDeleteError("Error deleting user details.");
    } finally {
      setDeleting(false);
    }
  };

  // Function to start editing
  const startEditing = () => {
    setIsEditing(true);
    setEditData({
      phoneNumber: note.phoneNumber || "",
      address: note.address || "",
      occupation: note.occupation || "",
    });
    setUpdateError(null);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setIsEditing(false);
    setEditData({
      phoneNumber: note.phoneNumber || "",
      address: note.address || "",
      occupation: note.occupation || "",
    });
    setUpdateError(null);
  };

  // Function to save updates
  const saveUpdate = async () => {
    // Validate required fields
    if (
      !editData.phoneNumber.trim() ||
      !editData.address.trim() ||
      !editData.occupation.trim()
    ) {
      setUpdateError("All fields are required");
      return;
    }

    setUpdating(true);
    setUpdateError(null);

    try {
      await updateDoc(doc(db, "users", note.id), {
        phoneNumber: editData.phoneNumber.trim(),
        address: editData.address.trim(),
        occupation: editData.occupation.trim(),
        updatedAt: new Date(),
      });
      setUpdateSuccess("User details updated successfully!");
      setTimeout(() => setUpdateSuccess(null), 4000);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
      setUpdateError("Failed to update user details. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div>
      <div className="border border-gray-300 p-4 my-6 rounded-lg shadow-lg">
        <div>
          <div className="flex flex-row gap-2 float-end mb-4">
            {isEditing ? (
              <>
                <button
                  onClick={saveUpdate}
                  disabled={updating}
                  className="hover:bg-green-500 text-green-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center p-2 rounded-full disabled:opacity-50"
                  title="Save changes"
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={cancelEditing}
                  disabled={updating}
                  className="hover:bg-gray-500 text-gray-600 hover:text-white transition-colors cursor-pointer flex items-center justify-center p-2 rounded-full"
                  title="Cancel editing"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="hover:bg-green-500 text-gray-500 hover:text-white transition-colors cursor-pointer flex items-center justify-center p-2 rounded-full"
                title="Edit details"
              >
                <PenLine className="h-4 w-4" />
              </button>
            )}
            <button
              className={`text-sm flex items-center justify-center p-2 rounded-full transition-colors cursor-pointer ${
                confirmDelete
                  ? "bg-red-400 text-red-600"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
              disabled={deleting}
              onClick={handleDelete}
              title={
                confirmDelete
                  ? "Click again to confirm delete"
                  : "Delete details"
              }
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
           {/* error message display */}
          {deleteError && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md mb-3 text-sm">
              {deleteError}
            </div>
          )}
          {/* success message display */}
          {/* {deleteSuccess && (
            <div className="bg-green-100 text-green-700 p-2 rounded-md mb-3 text-sm">
              {deleteSuccess}
            </div>
          )} */}
          {/* update success message */}
          {updateError && (
            <div className="bg-red-100 text-red-700 p-2 rounded-md mb-3 text-sm">
              {updateError}
            </div>
          )}
          {/* update success message */}
          {updateSuccess && (
            <div className="bg-green-100 text-green-700 p-2 rounded-md mb-3 text-sm">
              {updateSuccess}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            User Details
          </h2>

          <div className=" space-y-3 ">
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone number:
              </label>
              {isEditing ? (
                <PhoneInput
                  id="phoneNumber"
                  value={editData.phoneNumber}
                  onChange={(value) =>
                    setEditData({ ...editData, phoneNumber: value || "" })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  defaultCountry="US"
                  autoComplete="off"
                />
              ) : (
                <p className="text-gray-600">
                  {note.phoneNumber || "No Phone Number Provided"}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address:
              </label>
              {isEditing ? (
                <input
                  id="address"
                  type="text"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="Address"
                  autoComplete="off"
                />
              ) : (
                <p className="text-gray-600">
                  {note.address || "No Address Provided"}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Occupation:
              </label>
              {isEditing ? (
                <input
                  id="occupation"
                  type="text"
                  value={editData.occupation}
                  onChange={(e) =>
                    setEditData({ ...editData, occupation: e.target.value })
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  placeholder="Occupation"
                  autoComplete="off"
                />
              ) : (
                <p className="text-gray-600">
                  {note.occupation || "No Occupation Provided"}
                </p>
              )}
            </div>
          </div>

          {updating && (
            <div className="mt-3 text-sm text-gray-500 flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
              Updating...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
