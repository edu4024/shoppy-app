'use client';
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack
} from '@mantine/core';
import Image from 'next/image';
import classes from '@/app/styles/login/login.module.css';
import { login } from '@/app/src/lib/actions/auth.action';
import { SingInFormDto } from '@/app/src/dto/auth.dto';


export default function LoginForm() {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: ''
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length < 6 ? 'Password should include at least 6 characters' : null)
    }
  });

  const submitForm = (formData: SingInFormDto)=> {
    return login(formData);
  };

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form}>
        <Text size="lg" fw={700}>
          Welcome to Shopy
        </Text>
        <br/>

        <form onSubmit={form.onSubmit(submitForm)}>
          <Stack>
            {type === 'register' && (
              <>
                <TextInput
                label="First name"
                placeholder="Your name"
                value={form.values.firstName}
                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                radius="md" />

                <TextInput
                label="Last name"
                placeholder="Your last name"
                value={form.values.lastName}
                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                radius="md" />
              </>
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
              radius="md"
            />
          </Stack>

          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : 'Don\'t have an account? Register'}
            </Anchor>
          </Group>
          <br/>
          <Button type="submit" radius="x" w={400}>
            {upperFirst(type)}
          </Button>
        </form>
      </Paper>
      <div className={classes.image}>
        <Image
          src="/Frame.png"
          width={720}
          height={960}
          alt="Screenshots of the dashboard project showing desktop and mobile versions"
        />
      </div>
    </div>
  );
}
