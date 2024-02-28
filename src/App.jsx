import { useState } from 'react';
import Header from './components/Header';
import Button from './components/Button';
import { formatearDinero, calcularTotalPagar } from './utilitys';
import { useEffect } from 'react';

function App() {

  const [ cantidad, setCantidad ] = useState(10000);
  const [ meses, setMeses ] = useState(6);
  const [ total, setTotal ] = useState(0);
  const [ pago, setPago ] = useState(0);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e) {
    const value = parseInt(e.target.value);
    setCantidad(value); 
  }

  function handleClickDec() {
    const valor = cantidad - STEP;
    if(valor < MIN) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  function handleClickInc() {
    const valor = cantidad + STEP;
    if(valor > MAX) {
      alert('Cantidad no valida');
      return;
    }
    setCantidad(valor);
  }

  function handleChangeMeses(e) {
    const plazo = parseInt(e.target.value);
    setMeses(plazo);
  }

  useEffect(() => {

    const totalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(totalPagar);
  }, [cantidad, meses]);

  useEffect(() => {
    const pagoMensual = total / meses;

    setPago(pagoMensual);
  }, [total])

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10 rounded-2xl">
      <Header />
      <div className='flex justify-between my-6'>
        <Button handleClick={handleClickDec}>-</Button>
        <Button handleClick={handleClickInc}>+</Button>
      </div>
      <input 
        onChange={handleChange}
        type='range'
        className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {formatearDinero(cantidad)}
      </p>
      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>plazo</span> a pagar.
      </h2>
      <select 
        name=""
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'
        value={meses}
        onChange={handleChangeMeses}
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos.</span>
        </h2>
        <p className='text-xl text-gray-500 text-center font-bold'>{ meses } Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{ formatearDinero(total) } Total a pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{ formatearDinero(pago) } Mensuales</p>
      </div>
    </div>
  )
}

export default App
