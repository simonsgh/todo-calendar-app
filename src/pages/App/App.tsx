import React, { useRef } from 'react';

import CheckeredNotebook from '../../components/CheckeredNotebook/CheckeredNotebook';
import Calendar from '../../components/Calendar/Calendar';
import EventFormCreate from '../../components/EventFormCreate/EventFormCreate';
import ConnectionState from '../../components/ConnectionState/ConnectionState';

import { ReactComponent as DateRangeIcon } from '../../assets/svg/DateRange.svg';
import { ReactComponent as CloseIcon } from '../../assets/svg/Close.svg';

function App() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const handleClickOpen = () => {
    dialogRef.current?.showModal();
  };

  const handleClickClose = () => {
    dialogRef.current?.close();
  };

  return (
    <CheckeredNotebook>
      <div className="fixed top-0">
        <h1 className="cursor-pointer" onClick={handleClickOpen}>
          <DateRangeIcon className="inline-block h-5 w-5 mr-1" />
          todo
        </h1>
      </div>
      <div className="mr-6">
        <div className="container pt-1 pb-10 px-3">
          <dialog className="backdrop:bg-gray-50 backdrop:opacity-50" ref={dialogRef}>
            <div className="relative">
              <button className="absolute top-0 right-0" onClick={handleClickClose} title="Close">
                <CloseIcon className="block h-5 w-5" />
              </button>
              <EventFormCreate />
            </div>
          </dialog>
          <Calendar />
        </div>
      </div>
      <div className="fixed top-1 right-0.5">
        <ConnectionState />
      </div>
    </CheckeredNotebook>
  );
}

export default App;
