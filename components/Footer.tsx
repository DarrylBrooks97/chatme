const Footer = () => {
  return (
    <div className="flex justify-between p-3 mx-auto">
      <p className="text-white font-light">
        Made with 💚 by{' '}
        <span
          className="text-green-400"
          onClick={() => (window.location.href = 'https://www.twitter.com/Apxflex')}
        >
          Apxflex
        </span>
      </p>
    </div>
  );
};

export default Footer;
