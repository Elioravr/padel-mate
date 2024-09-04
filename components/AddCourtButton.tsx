'use client';

import { useState } from 'react';

const AddCourtButton = () => {
  const [isPublic, setIsPublic] = useState(false);
  const [courtDateTime, setCourtDateTime] = useState<string>('');
  const [courtDateTimeErrorMessage, setCourtDateTimeErrorMessage] = useState<
    string | null
  >(null);
  const [isCreatingCourt, setIsCreatingCourt] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPublic(event.target.checked); // Updates the state based on the checkbox's checked status
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCourtDateTime(event.target.value); // Updates the state with the selected date and time
    setCourtDateTimeErrorMessage(null);
  };

  const cleanForm = () => {
    setIsPublic(false);
    setCourtDateTime('');
    setCourtDateTimeErrorMessage(null);
  };

  const handleSubmit = () => {
    if (courtDateTime === '') {
      return setCourtDateTimeErrorMessage(
        'Please enter the court date and time'
      );
    }

    setIsCreatingCourt(true);
  };

  const icon = (
    <svg
      width='20px'
      height='20px'
      viewBox='0 0 32 32'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>plus</title>
      <desc>Created with Sketch Beta.</desc>
      <defs></defs>
      <g
        id='Page-1'
        stroke='none'
        strokeWidth='1'
        fill='none'
        fillRule='evenodd'
      >
        <g
          id='Icon-Set-Filled'
          transform='translate(-362.000000, -1037.000000)'
          fill='#a6adbb'
        >
          <path
            d='M390,1049 L382,1049 L382,1041 C382,1038.79 380.209,1037 378,1037 C375.791,1037 374,1038.79 374,1041 L374,1049 L366,1049 C363.791,1049 362,1050.79 362,1053 C362,1055.21 363.791,1057 366,1057 L374,1057 L374,1065 C374,1067.21 375.791,1069 378,1069 C380.209,1069 382,1067.21 382,1065 L382,1057 L390,1057 C392.209,1057 394,1055.21 394,1053 C394,1050.79 392.209,1049 390,1049'
            id='plus'
          ></path>
        </g>
      </g>
    </svg>
  );

  return (
    <div className='ml-3'>
      <button
        onClick={() =>
          (
            document.getElementById('add_new_court_modal') as HTMLDialogElement
          )?.showModal()
        }
      >
        {icon}
      </button>
      <dialog
        id='add_new_court_modal'
        className='modal modal-bottom sm:modal-middle'
      >
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Add new court</h3>
          <div className='flex flex-col'>
            <div className='form-control my-4'>
              <div className='label-text text-base font-bold'>Where?</div>
              <select
                className='select select-bordered w-full max-w-xs my-2'
                autoFocus
              >
                <option>כפר המכבייה רמת גן (מגרשים)</option>
                <option>אוניברסיטת תל אביב (מגרשים)</option>
                <option>כפר סבא (מגרשים)</option>
                <option>ראשון לציון (מגרשים)</option>
                <option>פאדל טיים קאנטרי דקל (לזוז)</option>
                <option>פאדל טיים קאנטרי דקל (לזוז)</option>
                <option>פאדל טיים קאנטרי דקל (לזוז)</option>
                <option>וילסון קלאב פאדל חולון (לזוז)</option>
                <option>וילסון קלאב פאדל ראשון לציון (לזוז)</option>
                <option>פאדל טיים רעננה (לזוז)</option>
                <option>פאדל קאנטרי כפר סבא (לזוז)</option>
                <option>וילסון רחובות (לזוז)</option>
                <option>וילסון מועדון הפאדל ירושלים (לזוז)</option>
                <option>הרצליה (טופ פאדל)</option>
                <option>סביון (טופ פאדל)</option>
                <option>נתניה (טופ פאדל)</option>
              </select>
            </div>
            <div className='form-control my-4'>
              <div className='label-text text-base font-bold'>When?</div>
              <label
                className={`input ${
                  courtDateTimeErrorMessage != null ? 'input-error' : ''
                } input-bordered flex items-center gap-2 my-2`}
              >
                <input
                  type='datetime-local'
                  className='grow'
                  value={courtDateTime}
                  onChange={handleDateChange}
                />
              </label>
              {courtDateTimeErrorMessage != null && (
                <div className='text-red-400'>{courtDateTimeErrorMessage}</div>
              )}
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer'>
                <div className='flex flex-col me-2'>
                  <div className='label-text text-base font-bold'>
                    Want others to join? {isPublic ? '(Public)' : '(Private)'}
                  </div>
                  {isPublic ? (
                    <div className='label-text text-sm my-2'>
                      If this is <span className='font-bold'>on</span>, this
                      will be available for everyone in their homescreen in case
                      they will want to join.
                    </div>
                  ) : (
                    <div className='label-text text-sm my-2'>
                      If this is <span className='font-bold'>off</span>, you
                      will need to send the link of the court to anyone you want
                      to invite.
                    </div>
                  )}
                </div>
                <input
                  type='checkbox'
                  className='toggle'
                  checked={isPublic}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
          </div>
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              {!isCreatingCourt && (
                <button className='btn me-2' onClick={cleanForm}>
                  Close
                </button>
              )}
            </form>
            <button className='btn btn-primary' onClick={handleSubmit}>
              {isCreatingCourt && (
                <span className='loading loading-spinner'></span>
              )}
              Create
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddCourtButton;
