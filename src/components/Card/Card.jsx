import './Card.css';

const IMAGE_PLACEMENT = ['top-full', 'left', 'right', 'bottom-full'];

export const Card = ({
  title,
  image,
  children,
  imagePosition = 'top-full',
  width,

}) => {
  const position = IMAGE_PLACEMENT.includes(imagePosition) ? imagePosition : '';
  const classes = `LL-Card ${position}`;

  return (
    <article className={classes} style={{ width: width ?? 'auto' }}>
      <section className={`LL-CardImage ${position}`}>
        <img
          src={image}
          alt={title}
          title={`${title} | Little Lemon`}
        />
      </section>
      <div className="LL-CardBody">{children}</div>
    </article>
  );
};
