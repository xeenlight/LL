import { useCallback, useReducer, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Main, Heading, ProgressBar, Button, Icon } from '../../components';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './BookingPage.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { BookingForm } from './components';
import { FormContextProvider } from '../../context';
import { submitAPI } from '../../utilities';

import { bookingFormReducer, STAGES, loadInitialState } from '../../actions';

export const BookingPage = () => {
  const location = useLocation();

  const [state, dispatch] = useReducer(bookingFormReducer, loadInitialState());

  useEffect(() => {
    if (location?.state?.from === 'navigation') dispatch({ type: 'reset' });
  }, [location?.state?.from]);

  const navigate = useNavigate();

  /*****************************************************************/
  /** Event Handling */
  /*****************************************************************/
  const goNextStage = useCallback(() => {
    const stageIndex = STAGES?.indexOf(state.stage) ?? STAGES.length;
    if (stageIndex < STAGES.length - 1) {
      dispatch({ type: 'setStage', payload: STAGES[stageIndex + 1] });
    }
    return;
  }, [state.stage]);

  const goPreviousStage = useCallback(() => {
    const stageIndex = STAGES?.indexOf(state.stage) ?? 0;
    if (stageIndex > 0) {
      dispatch({ type: 'setStage', payload: STAGES[stageIndex - 1] });
    } else {
      navigate('/');
    }
    return;
  }, [state.stage, navigate]);

  const submitForm = e => {
    e.preventDefault();
    try {
      // Loop through the state.formErrors object and find if any fields have errors
      if (Object.values(state.formErrors).find(val => val.length > 0)) {
        throw new Error('Form could not be submitted - contains errors!');
      }

      // Submit Form
      const response = submitAPI({
        booking_id: state.booking_id,
        ...state.formData,
      });
      if (response) {
        goNextStage();
        navigate('thank-you');
      } else throw new Error('Form could not be submitted to the server.');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Main>
      <ProgressBar
        value={((STAGES.indexOf(state.stage) + 1) / STAGES.length) * 100}
      />

      <nav className="LL-BookingPageNavigation">
        {STAGES[STAGES.length - 1] !== state.stage && (
          <Button ariaLabel="Go Back" unstyled onClick={goPreviousStage}>
            <Icon src={faArrowLeft} size="2x" />
          </Button>
        )}
        <Heading tag="h1" size="xl" align="center">
          {state.stage}
        </Heading>
        {STAGES[STAGES.length - 1] !== state.stage && (
          <Button ariaLabel="Exit" unstyled onClick={() => {}}>
            <Icon src={faTimes} size="2x" />
          </Button>
        )}
      </nav>

      <FormContextProvider value={{ state, dispatch }}>
        {STAGES.indexOf(state.stage) === 0 && (
          <section className="LL-BookingPageContainer">
            <section id="LL-BookingPageHero">
              <img
                src="https://www.afisha.uz/uploads/media/2022/09/efb9e2662ed44858b8cb9ec6916d943c_lf.jpg"
                alt="Little Lemon - Seating"
              />
            </section>
            <BookingForm onSubmit={submitForm} />
          </section>
        )}
        <Outlet
          context={{
            data: { booking_id: state.booking_id, ...state.formData },
            stage: state.stage,
          }}
        />
      </FormContextProvider>
    </Main>
  );
};
