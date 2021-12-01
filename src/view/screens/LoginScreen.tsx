import React, { ReactElement } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";
import { darken } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    background: `radial-gradient(${darken(theme.palette.info.dark, 0.5)} 0%, ${
      theme.palette.info.dark
    } 80%)`,
    color: theme.palette.info.contrastText,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "3.2rem",
    flex: "1 1 auto",
    flexShrink: 0,
    alignItems: "center",
    height: "100vh",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100%",
  },
  card: {
    maxWidth: "100%",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3.2rem",
  },
  typo: {
    marginTop: "1.6rem",
    marginBottom: "3.2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    maxWidth: "100%",
  },
  button: {
    marginTop: "1.6rem",
    marginLeft: "auto",
    marginRight: "auto",
    width: "22.4rem",
  },
}));

type LoginForm = {
  username: string;
  password: string;
  remember: boolean;
};

export const LoginScreen = (): ReactElement => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      username: "PrametUser",
      password: "pramet",
      remember: true,
    },
  });

  const onLogin = (data: LoginForm) => {
    console.log("jsi přihlášený");
  };

  return (
    <div className={classes.root}>
      <div className={classes.login}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h6" className={classes.typo}>
              LOGIN TO YOUR ACCOUNT
            </Typography>
            <form
              name="loginForm"
              noValidate
              className={classes.form}
              onSubmit={handleSubmit(onLogin)}
            >
              <TextField
                {...register("username", { required: true })}
                className="mb-16"
                label="Username"
                type="username"
                variant="outlined"
                fullWidth
              />

              <TextField
                {...register("password", { required: true })}
                className="mb-16"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <div className="flex items-center justify-between">
                <FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox {...register("remember")} defaultChecked />
                    }
                    label="Remember Me"
                  />
                </FormControl>
              </div>

              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="LOG IN"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                LOGIN
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
