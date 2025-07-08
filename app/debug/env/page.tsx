import { getEnvironmentVariables } from './actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function EnvPage() {
  const envs = await getEnvironmentVariables();

  // We will sort the keys to make the output predictable and easier to read.
  const sortedKeys = Object.keys(envs).sort();

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
          <p className="text-sm text-muted-foreground pt-2">
            This page displays all the environment variables available on the server.
            <br />
            <span className="font-semibold text-destructive">
              Warning:
            </span>{' '}
            Do not expose this page in a production environment.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40%]">Variable</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedKeys.map((key) => (
                <TableRow key={key}>
                  <TableCell className="font-mono text-sm break-all">
                    {key}
                  </TableCell>
                  <TableCell className="font-mono text-sm break-all">
                    {/* We are deliberately not hiding any values for debugging purposes,
                        but in a real-world scenario, sensitive keys should be masked. */}
                    {envs[key]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

