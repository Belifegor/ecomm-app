type Promo = {
  code: string;
  description: string;
};

const promoCodes: Promo[] = [
  { code: 'SAVE10', description: '10% off for all items' },
  { code: 'SAVE20', description: '20% off for all times' },
];

export function PromoBannerList() {
  return (
    <div className="flex justify-center mt-4 px-4">
      <div className="w-full max-w-xl text-center">
        <h2 className="text-xl font-bold mb-4">Current Promo Codes</h2>
        <div className="flex flex-col gap-4 mb-6">
          {promoCodes.map((promo) => (
            <div
              key={promo.code}
              className="bg-purple-100 text-purple-900 border-l-4 border-purple-500 p-4 rounded shadow"
            >
              <p className="font-semibold">
                Use code <span className="text-purple-700">{promo.code}</span>
              </p>
              <p className="text-sm">{promo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
