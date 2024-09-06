'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteCourtButton = ({ courtId }: { courtId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteCourt = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/courts?id=${courtId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete court');
      }

      // If deletion is successful, navigate away
      router.push(`/`);

      // Close the modal if it's open
      const modalCheckbox = document.getElementById(
        'delete_court_modal'
      ) as HTMLDialogElement | null;

      if (modalCheckbox) {
        modalCheckbox.close();
      }
    } catch (error) {
      console.error('Error deleting court:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        className='btn btn-outline btn-error w-full mt-10 mb-2'
        onClick={() =>
          (
            document.getElementById('delete_court_modal') as HTMLDialogElement
          )?.showModal()
        }
      >
        Delete Court
      </div>
      <dialog id='delete_court_modal' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Are you sure?</h3>
          <p className='py-4'>
            By pressing Delete, you will delete this court permanently. This
            action cannot be undone.
          </p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn me-2'>Close</button>
            </form>
            <button
              className='btn btn-error'
              onClick={deleteCourt}
              disabled={isDeleting} // Disable button while deleting
            >
              {isDeleting && <span className='loading loading-spinner'></span>}
              {isDeleting ? ' Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'></form>
      </dialog>
    </>
  );
};

export default DeleteCourtButton;
