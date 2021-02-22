import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import AppLayout from '../../../components/AppLayout';
import dynamic from 'next/dynamic';
const EditEditor = dynamic(() => import('../../../components/EditEditor'), {
  ssr: false,
});

const Edit = () => {
  return (
    <>
      <AppLayout>
        <EditEditor />
      </AppLayout>
    </>
  );
};

export default Edit;
