import { Heading, Stack } from '../../../../components';
import './About.css';

export const About = () => {
  return (
    <section id="about">
      <Stack className="about-columns" justify="space-between">
        <Stack.Item
          className="about-left-column"
          vertical
          gap="2.25rem"
          basis="50%"
        >
          <Stack.Item vertical>
            <Heading>Little Lemon</Heading>
            <p>Chicago</p>
          </Stack.Item>

          <p>
Lorem ipsum dolor sit amet, minim veniam, ullamco est aliqua dolor sit amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Lorem ipsum dolor sit amet, minim veniam, ullamco est aliqua dolor sit amet sint. Velit officia consequat duis enim velit mollit.
          </p>
        </Stack.Item>

        <section className="about-right-column">
          <section id="about-images">
            <div id="about-first-image">
              <img
                src="https://static.sobaka.ru/images/image/01/41/60/45/_normal.jpg?v=1619345572"
                alt="Little Lemon"
              />
            </div>
            <div id="about-second-image">
              <img
                src="https://www.openbusiness.ru/upload/fransh/restoran-v-malenkom-gorode2.jpg"
                alt="Little Lemon"
              />
            </div>
          </section>
        </section>
      </Stack>
    </section>
  );
};
