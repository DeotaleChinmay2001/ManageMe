import React from 'react';
import InputField from '../components/InputField';

type Props = {
  chest: string; setChest: (v: string) => void;
  waist: string; setWaist: (v: string) => void;
  height: string; setHeight: (v: string) => void;
  biceps: string; setBiceps: (v: string) => void;
  shoulder: string; setShoulder: (v: string) => void;
  
  neck: string; setNeck: (v: string) => void;
  butt: string; setButt: (v: string) => void;
};

const MeasurementInputs: React.FC<Props> = ({
  chest, setChest,
  waist, setWaist,
  height, setHeight,
  biceps, setBiceps,
  shoulder, setShoulder,
  neck, setNeck,
  butt, setButt,
}) => {
  return (
    <>
      <InputField label="Chest (cm)" value={chest} onChangeText={setChest} />
      <InputField label="Waist (cm)" value={waist} onChangeText={setWaist} />
      <InputField label="Height (cm)" value={height} onChangeText={setHeight} />
      <InputField label="Biceps (cm)" value={biceps} onChangeText={setBiceps} />
      <InputField label="Shoulder (cm)" value={shoulder} onChangeText={setShoulder} />
      <InputField label="Neck (cm)" value={neck} onChangeText={setNeck} />
      <InputField label="Butt (cm)" value={butt} onChangeText={setButt} />
    </>
  );
};

export default MeasurementInputs;
