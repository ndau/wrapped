import React, { useContext, useEffect, useState } from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { Loader } from './';
import { shortenAddress } from '../utils/shortenAddress';
import { CgArrowsExchange } from 'react-icons/all';
import * as yup from 'yup';

const commonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step='0.0001'
    value={value}
    onChange={(e) => handleChange(e, name)}
    className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism'
  />
);

const MODE = {
  NDAU_TO_POLYGON: 0,
  POLYGON_TO_NDAU: 1
};

const initData = {
  from: '',
  to: '',
  amount: '',
  message: ''
};

const PlaceHolders = {
  to: ['Wrapped NDAU Address on Polygon', 'NDAU Address'],
  from: ['Your NDAU Address', 'Your Polygon Address'],
  amount: ['Amount (NDAU)', 'Amount (wNDAU)']
};

const DataSchema = yup.object().shape({
  to: yup.string().required(),
  from: yup.string().required(),
  amount: yup.number().required(),
  message: yup.string()
});

const CustodianAddress = 'ndapbesybtb2744ihb2gh8qsev8my683y2gmrnkd3rjwgccc';

const Welcome = () => {
  // const { connectWallet, currentAccount, formData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);

  const [mode, setMode] = useState(MODE.NDAU_TO_POLYGON);
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(initData);
  const [visibleCustodian, setVisibleCustodian] = useState(false);

  useEffect(() => {
    setData(initData);
    setVisibleCustodian(false);
  }, [mode]);

  const handleSubmit = () => {
    console.log(data);

    DataSchema.isValid(data)
    .then((valid) => {
      console.log({ valid });
      if (valid) {
        switch (mode) {
          case MODE.NDAU_TO_POLYGON:
            setVisibleCustodian(true);
            break;
          case MODE.POLYGON_TO_NDAU:
            break;
          default:
            break;
        }
      }
    });

  };

  const connectWallet = () => {

  };

  const handleChange = (e, name) => {
    // console.log(name, e.target.value);
    let _data = { ...data };
    _data[name] = e.target.value;
    setData(_data);
  };

  const toggleMode = () => {
    setMode((mode + 1) % 2);
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className='flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4'>
        <div className='flex flex-1 justify-start items-start flex-col mf:mr-10'>
          <h1 className='text-3xl sm:text-5xl text-white py-1'>
            Send your <br />
            {mode === MODE.NDAU_TO_POLYGON ?
              ' NDAU to wNDAU.' :
              ' wNDAU to NDAU.'
            }
          </h1>
          <p className='text-left text-light mt-5 text-white font-light md:w-9/12 w-full text-base'>
            Feel free to get any token by sending your balance to our custodian wallet.
          </p>
          {!currentAccount && (
            <button
              type='button'
              onClick={connectWallet}
              className='flex flex-row justify-center items-center my-5 p-3 rounded-full cursor-pointer bg-gradient-to-r from-blue-300 to-blue-500 hover:from-sky-400 hover:via-rose-400 hover:to-lime-400'
            >
              <AiFillPlayCircle className='text-white mr-2' />
              <p className='text-white text-base font-semibold'>Connect Wallet</p>
            </button>
          )}

          <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${commonStyles}`}>Polygon</div>
            <div className={`sm:rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Low fees</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>NDAU</div>
          </div>
        </div>

        <div className='flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10'>
          <div className='p-5 sm:w-96 w-full flex text-white items-center'>
            {mode === MODE.NDAU_TO_POLYGON ?
              'NDAU to Polygon' :
              'Polygon to NDAU'
            }
            <button
              type='button'
              onClick={toggleMode}
              className='text-white border-[1px]  ml-5 p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
            >
              <CgArrowsExchange />
            </button>
          </div>
          <div className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'>
            <Input
              placeholder={PlaceHolders.to[mode]}
              name='to'
              value={data.to}
              type='text'
              handleChange={handleChange}
            />
            <Input
              placeholder={PlaceHolders.amount[mode]}
              name='amount'
              value={data.amount}
              type='number'
              handleChange={handleChange}
            />
            <Input
              placeholder={PlaceHolders.from[mode]}
              name='from'
              value={data.from}
              type='text'
              handleChange={handleChange}
            />
            <Input
              placeholder='Message'
              name='message'
              value={data.message}
              type='text'
              handleChange={handleChange}
            />

            <div className='h-[1px] w-full bg-gray-400 my-2' />
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                className='text-white w-full mt-5 mb-5 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer'
              >
                Send Now
              </button>
            )}
            <div className='w-full my-2'>
              {visibleCustodian &&
              <div className={'w-full text-white'}>
                Here is our custodian address.
                <Input
                value={CustodianAddress}
                type='text'
                disabled
                />
              </div>
              }
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Welcome;
