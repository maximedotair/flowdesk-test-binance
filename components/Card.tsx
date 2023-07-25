// components/Card.tsx

interface CardProps {
  label: string;
  value: string | number;
}

const Card = ({ label,value }: CardProps) => {
  return (
    <div className="p-3 border-2 border-blue-200 rounded">
      <p className="text-xs font-bold text-gray-500 uppercase">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
};

export default Card;