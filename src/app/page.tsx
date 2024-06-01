'use client';
import React, { useState } from 'react';
import AdministradorExcel from './utils/administradorExcel';
import { AdministrateXMLS } from './utils/administrarXmls';
import BigInteger from 'big-integer';
export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [secuencial, setSecuencial] = useState<string>('');
  const [fechaEmbarque, setFechaEmbarque] = useState<string>('');
  const [generacionTipo, setGeneracionTipo] = useState<string>('');
  const [pais, setPais] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

    const { name, value } = e.target;
    if (name === 'secuencial') {
      setSecuencial(value);
    } else if (name === 'fechaEmbarque') {
      setFechaEmbarque(value);
    } else if (name === 'generacionTipo') {
      setGeneracionTipo(value);
    } else if (name === 'pais') {
      setPais(value);
    }
    console.log('Name:', name);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('Submit');
    e.preventDefault();
    console.log('Secuencial:', secuencial);
    console.log('Fecha de Embarque:', fechaEmbarque);
    console.log('Tipo de generacion:', generacionTipo);

    if (file) {
      const administradorExcel = new AdministradorExcel(file);
      setTimeout(() => {
        const matriz = administradorExcel.getMatriz();
        console.log('Matriz de datos:', matriz);

        const excelString = administradorExcel.returnExcelString();
        console.log('Excel String:', excelString);

        const administrarXmls = new AdministrateXMLS(matriz, BigInteger(secuencial), fechaEmbarque, pais);
        administrarXmls.crearArchivos()
      }, 1000);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center max-w-screen-lg w-full">
        <div className="card w-full max-w-screen-lg shadow-2xl bg-base-100">
          <form className="card-body flex-row flex-wrap" onSubmit={handleSubmit}>
            <div className="indicator flex-1 card card-body card-bordered border-gray-300 shrink-0 w-full bg-base-100">
              <span className="indicator-item indicator-top indicator-center badge badge-primary">Configuracion inicial</span>
              <select
                className="select select-bordered w-full max-w-xs"
                name="generacionTipo"
                onChange={handleChange}
                value={generacionTipo}
              >
                <option disabled value="">Tipo de generacion</option>
                <option value="1">XMLS</option>
                <option value="2">Txt y Excel (FlowerCargo)</option>
              </select>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Secuencial</span>
                </label>
                <input
                  type="text"
                  name="secuencial"
                  placeholder="00000000xxxxx"
                  className="input input-bordered"
                  value={secuencial}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Archivo</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-primary file-input-bordered w-full max-w-xs"
                  onChange={handleFileChange}
                  required
                />
              </div>
            </div>

            <div className="indicator flex-1 card card-body card-bordered border-gray-300 shrink-0 w-full bg-base-100">
              <span className="indicator-item indicator-top indicator-center badge badge-primary">Datos transmisión</span>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Fecha de Embarque</span>
                </label>
                <input
                  type="date"
                  name="fechaEmbarque"
                  placeholder="dd/mm/yyyy"
                  className="input input-bordered"
                  value={fechaEmbarque}
                  onChange={handleChange}
                  required
                />
              </div>
              <label className="label">
                <span className="label-text">País</span>
              </label>
              <select className="select select-bordered w-full max-w-xs" name='pais' onChange={handleChange}>
                <option value={""} disabled selected>Seleccione país</option>
                <option value={"ALA"}>ALA</option>
              </select>
            </div>

            <div className="form-control mt-6 w-full">
              <button className="btn btn-primary max-w-sm mx-auto" type="submit">Generar Archivos</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
