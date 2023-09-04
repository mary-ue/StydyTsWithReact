import { useState } from 'react';
import { IProduct } from '../models';
import axios from 'axios';
import { Error } from './Error';

const productData: IProduct = {
  title: '',
  price: 13.5,
  description: 'lorem ipsum set',
  image: 'https://i.pravatar.cc',
  category: 'electronic',
  rating: {
    rate: 42,
    count: 10,
  },
};

interface CreateProductProps {
  onCreate: (product: IProduct) => void;
}

export const CreateProduct = ({ onCreate }: CreateProductProps) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (evt: React.FormEvent) => {
    evt.preventDefault();
    setError('');

    if (value.trim().length === 0) {
      setError('Please enter valid title');
      return;
    }

    productData.title = value;

    const response = await axios.post<IProduct>(
      'https://fakestoreapi.com/products',
      productData
    );

    onCreate(response.data);
  };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        className="border py-2 px-4 mb-2 w-full outline-0"
        type="text"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />
      {error && <Error error={error} />}
      <button
        className="py-2 px-4 border bg-yellow-400 hover:text-white"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};
