import GradientButton from './GradientButton';

/* Constants */
const gradiantId = 'BuyHeadCurrentlyRaisedBtn-gradiant';

/* Utils */
const fillGradient = () => {
  return (
    <defs>
      <linearGradient id={gradiantId} x1="0.171875" y1="13.75" x2="181.32" y2="13.75" gradientUnits="userSpaceOnUse">
        <stop stop-color="rgba(18, 53, 42, 0.26)" />
        <stop offset="1" stop-color="rgba(45, 125, 100, 0.26)" />
      </linearGradient>
    </defs>
  );
};


/* Component */
const BuyHeadCurrentlyRaisedBtn = () => {

  return (
    <GradientButton
      customLabelRenderer={(refs:any) => (
        <div className="flex justify-between md:justify-start items-center gap-[4px]">
          <div className='flex items-center gap-[4px]'>
            <span>CURRENTLY RAISED:</span>
          </div>
        </div>
      )}
      color="#537FEE"
      fillGradientIds={[gradiantId]}
      fillGradients={[fillGradient()]}
      backgroundActive={`#${gradiantId}`}
      isActive
      gradient={['#12352A', '#2D7D64']}
      gradientPrecision={10}
      className="w-full md:min-w-fit md:!w-fit"
      textContainerClassName="!block w-full md:!w-fit"
    />
  );
};

export default BuyHeadCurrentlyRaisedBtn;
