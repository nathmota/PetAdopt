import React from 'react';
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  Modal,
  Button,
  TextField,
} from '@material-ui/core';
import { FemaleIcon, MaleIcon } from '@material-ui/icons';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    width: '90%',
    maxWidth: 500,
  },
  modalCardContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  marginTop: {
    marginTop: theme.spacing(2),
  },
});

const PostEditor = ({ classes, post, onSave, history }) => (
  <Form initialValues={post} onSubmit={onSave}>
    {({ handleSubmit }) => (
      <Modal
        className={classes.modal}
        onClose={() => history.goBack()}
        open
      >
        <Card className={classes.modalCard}>
          <form onSubmit={handleSubmit}>
            <CardContent className={classes.modalCardContent}>
              <Field name="title">
                {({ input }) => <TextField required label="Título" autoFocus {...input} />}
              </Field>
              <Field name="contact">
                {({ input }) => <TextField label="Dados para Contato" {...input} />}
              </Field>
              <Field name="petName">
                {({ input }) => <TextField label="Nome do Pet" {...input} />}
              </Field>
              <Field name="petBreed">
                {({ input }) => <TextField label="Raça do Pet" {...input} />}
              </Field>
              <Field name="place">
                {({ input }) => <TextField label="Localização" {...input} />}
              </Field>
              <Field name="description">
                {({ input }) => (
                  <TextField
                    className={classes.marginTop}
                    label="Descrição"
                    multiline
                    rows={4}
                    {...input}
                  />
                )}
              </Field>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" type="submit">Salvar</Button>
              <Button size="small" onClick={() => history.goBack()}>Cancelar</Button>
            </CardActions>
          </form>
        </Card>
      </Modal>
    )}
  </Form>
);

export default compose(
  withRouter,
  withStyles(styles),
)(PostEditor);
