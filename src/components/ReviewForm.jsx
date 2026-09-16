import { useMutation } from '@apollo/client';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import * as Yup from 'yup';
import Text from './Text';
import { CREATE_REVIEW } from '../graphql/mutations';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: Yup.string(),
});

const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text,
          },
        },
      });

      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch {
      setStatus('Creating the review failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit: submitForm,
        status,
        touched,
        values,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Repository owner"
            value={values.ownerName}
            onChangeText={handleChange('ownerName')}
            onBlur={handleBlur('ownerName')}
          />
          {touched.ownerName && errors.ownerName && (
            <Text style={styles.errorText}>{errors.ownerName}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Repository name"
            value={values.repositoryName}
            onChangeText={handleChange('repositoryName')}
            onBlur={handleBlur('repositoryName')}
          />
          {touched.repositoryName && errors.repositoryName && (
            <Text style={styles.errorText}>{errors.repositoryName}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Rating (0-100)"
            value={values.rating}
            onChangeText={handleChange('rating')}
            onBlur={handleBlur('rating')}
            keyboardType="numeric"
          />
          {touched.rating && errors.rating && (
            <Text style={styles.errorText}>{errors.rating}</Text>
          )}

          <TextInput
            style={[styles.input, styles.reviewInput]}
            placeholder="Review"
            value={values.text}
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            multiline
          />
          {touched.text && errors.text && (
            <Text style={styles.errorText}>{errors.text}</Text>
          )}

          {status && <Text style={styles.errorText}>{status}</Text>}

          <Pressable
            style={styles.button}
            onPress={submitForm}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 20,
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#999',
    borderRadius: 5,
    borderWidth: 1,
    padding: 12,
  },
  reviewInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#d73a4a',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 14,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default ReviewForm;