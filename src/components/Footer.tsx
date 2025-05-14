export function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Левая колонка */}
        <div>
          <h2 className="text-xl font-bold mb-4">cyber</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            We are a residential interior design firm located in Portland. Our
            boutique-studio offers more than
          </p>
        </div>

        {/*  Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Bonus program</a>
            </li>
            <li>
              <a href="#">Gift cards</a>
            </li>
            <li>
              <a href="#">Credit and payment</a>
            </li>
            <li>
              <a href="#">Service contracts</a>
            </li>
            <li>
              <a href="#">Non-cash account</a>
            </li>
            <li>
              <a href="#">Payment</a>
            </li>
          </ul>
        </div>

        {/*  Assistance */}
        <div>
          <h3 className="font-semibold mb-4">Assistance to the buyer</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">Find an order</a>
            </li>
            <li>
              <a href="#">Terms of delivery</a>
            </li>
            <li>
              <a href="#">Exchange and return of goods</a>
            </li>
            <li>
              <a href="#">Guarantee</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">Terms of use</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Соцсети  */}
      <div className="mt-12 flex justify-center gap-6"></div>
    </footer>
  );
}
