const StatBox = ({ title, count, color }) => {
  return (
    <div className={`p-6 rounded-xl shadow-md text-white ${color} w-full`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default StatBox;
